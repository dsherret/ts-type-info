import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class NamedImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition;
    alias: string;
    name: string;

    constructor() {
        super(DefinitionType.NamedImportPart);
    }
}
