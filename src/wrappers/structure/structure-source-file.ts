import {ISymbol} from "./../symbol";
import {INode} from "./../node";
import {ISourceFile} from "./../source-file";
import {IImportClause} from "./../import-clause";

export class StructureSourceFile implements ISourceFile {
    getFileName() {
        return "";
    }

    getFileImportClauses(): IImportClause[] {
        return [];
    }

    getFileReExportSymbols(): ISymbol[] {
        return [];
    }

    getDefaultExportSymbol(): ISymbol {
        return null;
    }

    getNode(): INode {
        return null;
    }
}
