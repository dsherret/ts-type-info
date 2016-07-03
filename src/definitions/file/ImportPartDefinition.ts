import {DefinitionType} from "./../base";
import {BaseImportPartDefinition} from "./BaseImportPartDefinition";

export class ImportPartDefinition extends BaseImportPartDefinition {
    private _alias: string;

    constructor() {
        super(DefinitionType.ImportPart);
    }

    get importName(): string {
        return this._alias || this.definitions.length && this.definitions[0].name || null;
    }

    set importName(value: string) {
        if (this.definitions.length > 0 && this.definitions[0].name === value) {
            this._alias = null;
        }
        else {
            this._alias = value;
        }
    }
}
