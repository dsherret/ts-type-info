import {ExportableStructure} from "./../../../structures";
import {ExportableBinder} from "./../../base";

export class StructureExportableBinder extends ExportableBinder {
    constructor(private structure: ExportableStructure) {
        super();
    }

    getIsExported() {
        return this.structure.isExported || false;
    }

    getIsDefaultExportOfFile() {
        return this.structure.isDefaultExportOfFile || false;
    }

    getIsNamedExportOfFile() {
        return this.structure.isNamedExportOfFile || false;
    }
}
