import {DefinitionType} from "./../base";
import {BaseImportPartDefinition} from "./BaseImportPartDefinition";

export class ReExportPartDefinition extends BaseImportPartDefinition {
    private _alias: string;

    constructor() {
        super(DefinitionType.ReExportPart);
    }

    get exportName(): string {
        return this._alias || this.definitions.length && this.definitions[0].name || null;
    }

    set exportName(value: string) {
        this._alias = value;
    }
}
