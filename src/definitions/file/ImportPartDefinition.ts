import {DefinitionType} from "./../base";
import {BaseImportPartDefinition} from "./BaseImportPartDefinition";

export class ImportPartDefinition extends BaseImportPartDefinition {
    constructor() {
        super(DefinitionType.ImportPart);
    }

    importName: string;
}
