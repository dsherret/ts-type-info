import {ISymbolNode} from "./symbol-node";

export interface ISourceFile extends ISymbolNode {
    getFileName(): string;
    getFileImportSymbols(): ISymbolNode[];
    getFileReExportSymbols(): ISymbolNode[];
    getDefaultExportSymbol(): ISymbolNode;
}
