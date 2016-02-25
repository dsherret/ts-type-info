import * as ts from "typescript";
import {ImportType} from "./../../definitions";
import {Logger} from "./../../utils";
import {IImportClause} from "./../import-clause";
import {ISourceFile} from "./../source-file";
import {ISymbolNode} from "./../symbol-node";
import {TsImportClause} from "./ts-import-clause";
import {TsSymbolNode} from "./ts-symbol-node";
import {TsTypeChecker} from "./utils/ts-type-checker";
import {TsCache} from "./utils/ts-cache";

export interface TsSourceFileOptions {
    typeChecker: TsTypeChecker;
    sourceFile: ts.SourceFile;
    tsCache: TsCache;
    symbol: ts.Symbol;
    node: ts.Node;
}

export class TsSourceFile extends TsSymbolNode implements ISourceFile {
    constructor(opts: TsSourceFileOptions) {
        super({
            typeChecker: opts.typeChecker,
            sourceFile: opts.sourceFile,
            tsCache: opts.tsCache,
            parentNode: null,
            node: opts.node,
            symbol: opts.symbol,
            tsSourceFile: this
        });
    }

    getFileReExportSymbols(): ISymbolNode[] {
        const fileReExports: ts.Symbol[] = [];

        if (this.fileHasExports()) {
            for (const exportSymbol of this.typeChecker.getExportsOfModule(this.symbol)) {
                if (!this.typeChecker.isSymbolNamedExportOfFile(exportSymbol, this.sourceFile) && !this.typeChecker.isSymbolDefaultExportOfFile(exportSymbol, this.sourceFile)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }

        return fileReExports.map(symbol => this.createSymbolNodeFromSymbol(symbol));
    }

    getDefaultExportSymbol(): ISymbolNode {
        if (this.fileHasExports()) {
            const defaultExport = this.symbol.exports["default"];

            if (defaultExport != null) {
                return this.createSymbolNodeFromSymbol(defaultExport);
            }
        }
    }

    getFileName() {
        return (this.node as ts.SourceFile).fileName;
    }

    getFileImportClauses(): IImportClause[] {
        const importDeclarations = ((this.sourceFile as any)["imports"] as ts.Node[]).map(d => d.parent as ts.ImportDeclaration);
        const importClauses: IImportClause[] = [];

        importDeclarations.filter(d => d.importClause != null).forEach(d => {
            const moduleSpecifierText = (d.moduleSpecifier.getText() || "").replace(/["']/g, "");
            const clause = d.importClause;

            if (clause.namedBindings != null) {
                if ((clause.namedBindings as ts.NamedImportsOrExports).elements != null) {
                    importClauses.push(...this.getNamedImports(clause.namedBindings as ts.NamedImportsOrExports, moduleSpecifierText));
                }
                else if ((clause.namedBindings as ts.NamespaceImport).name != null) {
                    importClauses.push(...this.getNamespaceImport(clause.namedBindings as ts.NamespaceImport, moduleSpecifierText));
                }
                else {
                    Logger.warn(`Unknown scenario with import clause: ${clause.name}`);
                }
            }
            else if (clause.name != null) {
                importClauses.push(this.getDefaultImport(clause.name, moduleSpecifierText));
            }
            else {
                Logger.warn(`Unknown import clause in ${this.getFileName()}`);
            }
        });

        return importClauses;
    }

    private fileHasExports() {
        return this.symbol != null;
    }

    private getNamedImports(namedBindings: ts.NamedImportsOrExports, moduleSpecifierText: string) {
        return namedBindings.elements.map(element => {
            const symbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(element));

            /* istanbul ignore else */
            if (symbol != null) {
                return this.createImportClause({
                    name: element.name.text,
                    importType: ImportType.Named,
                    symbol: symbol,
                    moduleSpecifier: moduleSpecifierText
                });
            }
            else {
                Logger.warn(`Unknown symbol: ${element.name.text}`);
            }
        }).filter(e => e != null);
    }

    private getNamespaceImport(namespaceImport: ts.NamespaceImport, moduleSpecifierText: string) {
        const starSymbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(namespaceImport.name));
        const importClauses: TsImportClause[] = [];

        if (starSymbol != null) {
            for (const exportSymbol of this.typeChecker.getExportsOfModule(starSymbol)) {
                importClauses.push(this.createImportClause({
                    name: namespaceImport.name.text,
                    importType: ImportType.Namespace,
                    moduleSpecifier: moduleSpecifierText,
                    symbol: exportSymbol
                }));
            }
        }
        else {
            Logger.warn(`Unknown namespace import: ${namespaceImport.name.text}`);
        }

        return importClauses;
    }

    private getDefaultImport(identifier: ts.Identifier, moduleSpecifierText: string) {
        return this.createImportClause({
            name: identifier.text,
            importType: ImportType.Default,
            moduleSpecifier: moduleSpecifierText,
            symbol: this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(identifier))
        });
    }

    private createImportClause(opts: { importType: ImportType; name: string; moduleSpecifier: string; symbol: ts.Symbol }) {
        return new TsImportClause({
            tsCache: this.tsCache,
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            name: opts.name,
            moduleSpecifier: opts.moduleSpecifier,
            importType: opts.importType,
            // todo: this should just be a symbol and not a SymbolNode
            symbolNode: this.createSymbolNode({
                node: null,
                symbol: opts.symbol
            })
        });
    }
}
