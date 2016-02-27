import * as ts from "typescript";
import {ImportType} from "./../../definitions";
import {Logger} from "./../../utils";
import {IImportClause} from "./../import-clause";
import {ISourceFile} from "./../source-file";
import {INode} from "./../node";
import {ISymbol} from "./../symbol";
import {TsBase, TsBaseOptions} from "./ts-base";
import {TsNode} from "./ts-node";
import {TsSymbol} from "./ts-symbol";
import {TsImportClause} from "./ts-import-clause";

// todo: consider passing in ISymbol and INode
export interface TsSourceFileOptions extends TsBaseOptions {
    symbol: ts.Symbol;
    sourceFile: ts.SourceFile;
}

export class TsSourceFile extends TsBase implements ISourceFile {
    private symbol: ts.Symbol;

    constructor(opts: TsSourceFileOptions) {
        super(opts);

        // symbol can be null
        this.symbol = opts.symbol;
    }

    getFileReExportSymbols(): ISymbol[] {
        const fileReExports: ts.Symbol[] = [];

        if (this.fileHasExports()) {
            for (const exportSymbol of this.typeChecker.getExportsOfModule(this.symbol)) {
                if (!this.typeChecker.isSymbolNamedExportOfFile(exportSymbol, this.sourceFile) && !this.typeChecker.isSymbolDefaultExportOfFile(exportSymbol, this.sourceFile)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }

        return fileReExports.map(symbol => this.createSymbol(symbol));
    }

    getDefaultExportSymbol(): ISymbol {
        if (this.fileHasExports()) {
            const defaultExportSymbol = this.symbol.exports["default"];

            if (defaultExportSymbol != null) {
                return this.createSymbol(defaultExportSymbol);
            }
        }
    }

    getFileName() {
        return (this.sourceFile as ts.SourceFile).fileName;
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

    getNode(): INode {
        return this.createNode(this.sourceFile, this.createSymbol(this.symbol));
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
            name: opts.name,
            moduleSpecifier: opts.moduleSpecifier,
            importType: opts.importType,
            symbol: this.createSymbol(opts.symbol),
            sourceFile: this.sourceFile
        });
    }

    private createNode(node: ts.Node, tsSymbol: ISymbol): INode {
        return this.tsCache.getNode(
            node,
            () => new TsNode(
                {
                    tsCache: this.tsCache,
                    typeChecker: this.typeChecker,
                    node: node,
                    tsSourceFile: this,
                    sourceFile: this.sourceFile
                },
                tsSymbol
            )
        );
    }

    private createSymbol(symbol: ts.Symbol): ISymbol {
        if (symbol == null) {
            return null;
        }
        else {
            return this.tsCache.getSymbol(symbol, () => new TsSymbol({
                tsCache: this.tsCache,
                typeChecker: this.typeChecker,
                symbol: symbol,
                tsSourceFile: this,
                sourceFile: this.sourceFile
            }));
        }
    }
}
