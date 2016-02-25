import {ISymbolNode} from "./../symbol-node";
import {ISourceFile} from "./../source-file";
import {IImportClause} from "./../import-clause";
import {StructureSymbolNode} from "./structure-symbol-node";

export class StructureSourceFile extends StructureSymbolNode implements ISourceFile {
    getFileName() {
        return "";
    }

    getFileImportClauses(): IImportClause[] {
        return [];
    }

    getFileReExportSymbols(): ISymbolNode[] {
        return [];
    }

    getDefaultExportSymbol(): ISymbolNode {
        return null;
    }
}
