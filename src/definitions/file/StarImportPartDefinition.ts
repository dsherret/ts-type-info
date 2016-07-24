import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class StarImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition;
    name: string;

    constructor() {
        super(DefinitionType.StarImportPart);
    }
}
