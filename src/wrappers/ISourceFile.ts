import {ISymbol} from "./ISymbol";
import {INode} from "./INode";

export interface ISourceFile {
    getFileName(): string;
    getDefaultExportSymbol(): ISymbol;
    getNode(): INode;
}
