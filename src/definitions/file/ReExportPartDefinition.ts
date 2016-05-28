import {DefinitionType} from "./../base";
import {BaseImportPartDefinition} from "./BaseImportPartDefinition";

export class ReExportPartDefinition extends BaseImportPartDefinition {
    private _exportName: string;

    constructor() {
        super(DefinitionType.ReExportPart);
    }

    get exportName(): string {
        return this._exportName || this.definitions.length && this.definitions[0].name || null;
    }

    set exportName(value: string) {
        this._exportName = value;
    }
}
