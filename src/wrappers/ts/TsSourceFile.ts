import * as ts from "typescript";
import {ISourceFile} from "./../ISourceFile";
import {INode} from "./../INode";
import {ISymbol} from "./../ISymbol";
import {TsBase, TsBaseOptions} from "./TsBase";
import {TsNode} from "./TsNode";
import {TsSymbol} from "./TsSymbol";

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

    getDefaultExportSymbol(): ISymbol {
        if (this.fileHasExports()) {
            const defaultExportSymbol = this.symbol.exports["default"];

            if (defaultExportSymbol != null) {
                return this.createSymbol(defaultExportSymbol);
            }
        }

        return null;
    }

    getFileName() {
        return this.sourceFile.fileName;
    }

    getNode(): INode {
        return this.createNode(this.sourceFile, this.createSymbol(this.symbol));
    }

    private fileHasExports() {
        return this.symbol != null;
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
