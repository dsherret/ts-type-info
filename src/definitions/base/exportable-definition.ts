import {WrappedSymbolNode} from "./../../wrappers";

export interface IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable(symbolNode: WrappedSymbolNode): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;

    fillExportable(symbolNode: WrappedSymbolNode) {
        this.isExported = symbolNode.isExported();
        this.isNamedExportOfFile = symbolNode.isNamedExport();
        this.isDefaultExportOfFile = symbolNode.isDefaultExport();
    }
}
