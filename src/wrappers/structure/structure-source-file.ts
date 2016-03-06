import {ISymbol} from "./../symbol";
import {INode} from "./../node";
import {ISourceFile} from "./../source-file";

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
