import {ExportableDefinition} from "./../../../definitions";

export abstract class ExportableBinder {
    abstract getIsExported(): boolean;
    abstract getIsDefaultExportOfFile(): boolean;
    abstract getIsNamedExportOfFile(): boolean;

    bind(def: ExportableDefinition) {
        def.isExported = this.getIsExported();
        def.isDefaultExportOfFile = this.getIsDefaultExportOfFile();
        def.isNamedExportOfFile = this.getIsNamedExportOfFile();
    }
}
