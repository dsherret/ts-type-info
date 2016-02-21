import * as ts from "typescript";
import {Logger} from "./../../utils";
import {ISourceFile} from "./../source-file";
import {ISymbolNode} from "./../symbol-node";
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

    getFileImportSymbols(): ISymbolNode[] {
        const importDeclarations = (this.sourceFile as any)["imports"] as ts.Node[];
        const importClauses = importDeclarations.map(d => (d.parent as ts.ImportDeclaration).importClause);
        const fileImports: ts.Symbol[] = [];

        importClauses.filter(c => c != null).forEach(c => {
            /* istanbul ignore else */
            if (c.namedBindings != null) {
                const namedBindings = (c.namedBindings as (ts.NamedImportsOrExports & ts.NamespaceImport));

                /* istanbul ignore else */
                if (namedBindings.elements != null) {
                    // named exports
                    namedBindings.elements.forEach(e => {
                        const symbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(e));

                        /* istanbul ignore else */
                        if (symbol != null) {
                            fileImports.push(symbol);
                        }
                        else {
                            Logger.warn(`Unknown symbol: ${e.name.text}`);
                        }
                    });
                }
                else if (namedBindings.name != null) {
                    // * as exports
                    const starSymbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(namedBindings.name));

                    /* istanbul ignore else */
                    if (starSymbol != null) {
                        for (const exportSymbol of this.typeChecker.getExportsOfModule(starSymbol)) {
                            fileImports.push(exportSymbol);
                        }
                    }
                    else {
                        Logger.warn(`Unknown symbol: ${namedBindings.name.text}`);
                    }
                }
                else {
                    Logger.warn(`Unknown scenario with import clause: ${c.name}`);
                }
            }
            else if (c.name != null) {
                // default exports
                fileImports.push(this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(c.name)));
            }
            else {
                Logger.warn(`Unknown import clause in ${this.getFileName()}`);
            }
        });

        return fileImports.map(symbol => this.createSymbolNodeFromSymbol(symbol));
    }

    getFileReExportSymbols(): ISymbolNode[] {
        const fileReExports: ts.Symbol[] = [];

        // when a file doesn't have exports the symbol will be null
        if (this.symbol != null) {
            for (const exportSymbol of this.typeChecker.getExportsOfModule(this.symbol)) {
                if (!this.typeChecker.isSymbolNamedExportOfFile(exportSymbol, this.sourceFile) && !this.typeChecker.isSymbolDefaultExportOfFile(exportSymbol, this.sourceFile)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }

        return fileReExports.map(symbol => this.createSymbolNodeFromSymbol(symbol));
    }

    getDefaultExportSymbol(): ISymbolNode {
        // when a file doesn't have exports the symbol will be null
        if (this.symbol != null) {
            const defaultExport = this.symbol.exports["default"];

            if (defaultExport != null) {
                return this.createSymbolNodeFromSymbol(defaultExport);
            }
        }
    }

    getFileName() {
        return (this.node as ts.SourceFile).fileName;
    }
}
