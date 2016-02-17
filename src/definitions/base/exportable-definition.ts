import {WrappedSymbolNode} from "./../../wrappers";
import {ExportableStructure} from "./../../structures";

export interface IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable(symbolNodeOrStructure: WrappedSymbolNode | ExportableStructure): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;

    fillExportable(symbolNodeOrStructure: WrappedSymbolNode | ExportableStructure) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.isExported = symbolNodeOrStructure.isExported();
            this.isNamedExportOfFile = symbolNodeOrStructure.isNamedExport();
            this.isDefaultExportOfFile = symbolNodeOrStructure.isDefaultExport();
        }
        else {
            this.isExported = symbolNodeOrStructure.isExported;
            this.isNamedExportOfFile = symbolNodeOrStructure.isNamedExportOfFile;
            this.isDefaultExportOfFile = symbolNodeOrStructure.isDefaultExportOfFile;
        }
    }
}
