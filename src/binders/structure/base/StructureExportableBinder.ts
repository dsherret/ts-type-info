import {ExportableStructure} from "./../../../structures";
import {ExportableBinder} from "./../../base";

export class StructureExportableBinder extends ExportableBinder {
    constructor(private structure: ExportableStructure) {
        super();
    }

    getIsExported() {
        return this.structure.isExported;
    }

    getIsDefaultExportOfFile() {
        return this.structure.isDefaultExportOfFile;
    }

    getIsNamedExportOfFile() {
        return this.structure.isNamedExportOfFile;
    }
}
