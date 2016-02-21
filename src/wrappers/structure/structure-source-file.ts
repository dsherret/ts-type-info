import {ISymbolNode} from "./../symbol-node";
import {ISourceFile} from "./../source-file";
import {StructureSymbolNode} from "./structure-symbol-node";

export class StructureSourceFile extends StructureSymbolNode implements ISourceFile {
    getFileName() {
        return "";
    }

    getFileImportSymbols(): ISymbolNode[] {
        return [];
    }

    getFileReExportSymbols(): ISymbolNode[] {
        return [];
    }

    getDefaultExportSymbol(): ISymbolNode {
        return null;
    }
}
