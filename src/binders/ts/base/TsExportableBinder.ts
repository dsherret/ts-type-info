import {TsNode, TsSymbol} from "./../../../compiler";
import {ExportableBinder} from "./../../base";

export class TsExportableBinder extends ExportableBinder {
    private readonly symbol: TsSymbol | null;

    constructor(node: TsNode) {
        super();
        this.symbol = node.getSymbol();
    }

    getIsExported() {
        return this.symbol != null && this.symbol.isExported();
    }

    getIsDefaultExportOfFile() {
        return this.symbol != null && this.symbol.isDefaultExport();
    }

    getIsNamedExportOfFile() {
        return this.symbol != null && this.symbol.isNamedExport();
    }
}
