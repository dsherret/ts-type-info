import {ISymbol} from "./symbol";
import {INode} from "./node";
import {IImportClause} from "./import-clause";

export interface ISourceFile {
    getFileName(): string;
    getFileImportClauses(): IImportClause[];
    getFileReExportSymbols(): ISymbol[];
    getDefaultExportSymbol(): ISymbol;
    getNode(): INode;
}
