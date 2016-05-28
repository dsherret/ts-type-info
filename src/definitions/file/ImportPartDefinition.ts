import {DefinitionType} from "./../base";
import {BaseImportPartDefinition} from "./BaseImportPartDefinition";

export class ImportPartDefinition extends BaseImportPartDefinition {
    private _importName: string;

    constructor() {
        super(DefinitionType.ImportPart);
    }

    get importName(): string {
        return this._importName || this.definitions.length && this.definitions[0].name || null;
    }

    set importName(value: string) {
        this._importName = value;
    }
}
