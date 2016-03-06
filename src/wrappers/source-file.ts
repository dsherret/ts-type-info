import {ISymbol} from "./symbol";
import {INode} from "./node";

export interface ISourceFile {
    getFileName(): string;
    getDefaultExportSymbol(): ISymbol;
    getNode(): INode;
}
