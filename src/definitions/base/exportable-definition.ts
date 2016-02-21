import {ISymbolNode} from "./../../wrappers";

export interface IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable(symbolNode: ISymbolNode): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;

    fillExportable(symbolNode: ISymbolNode) {
        this.isExported = symbolNode.isExported();
        this.isNamedExportOfFile = symbolNode.isNamedExport();
        this.isDefaultExportOfFile = symbolNode.isDefaultExport();
    }
}
