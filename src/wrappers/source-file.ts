import {ISymbolNode} from "./symbol-node";
import {IImportClause} from "./import-clause";

export interface ISourceFile extends ISymbolNode {
    getFileName(): string;
    getFileImportClauses(): IImportClause[];
    getFileReExportSymbols(): ISymbolNode[];
    getDefaultExportSymbol(): ISymbolNode;
}
