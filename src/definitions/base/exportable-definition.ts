import {INode} from "./../../wrappers";

export interface IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable(node: INode): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;

    fillExportable(node: INode) {
        const symbol = node.getSymbol();

        this.isExported = symbol != null && symbol.isExported();
        this.isNamedExportOfFile = symbol != null && symbol.isNamedExport();
        this.isDefaultExportOfFile = symbol != null && symbol.isDefaultExport();
    }
}
