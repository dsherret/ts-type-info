import {DefinitionType} from "./../base";
import {BaseImportPartDefinition} from "./BaseImportPartDefinition";

export class ReExportPartDefinition extends BaseImportPartDefinition {
    constructor() {
        super(DefinitionType.ReExportPart);
    }

    exportName: string;
}
