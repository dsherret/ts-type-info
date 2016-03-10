import {ISymbol} from "./../ISymbol";
import {INode} from "./../INode";
import {ISourceFile} from "./../ISourceFile";

export class StructureSourceFile implements ISourceFile {
    getFileName() {
        return "";
    }

    getDefaultExportSymbol(): ISymbol {
        return null;
    }

    getNode(): INode {
        return null;
    }
}
