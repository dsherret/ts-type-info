import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class ReExportPartDefinition extends BaseDefinition {
    constructor() {
        super(DefinitionType.ReExportPart);
    }

    exportName: string;
    definitions: ExportableDefinitions[];
    expression: ExpressionDefinition;
}
