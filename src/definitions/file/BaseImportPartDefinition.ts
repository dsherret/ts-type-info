import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expression";

export abstract class BaseImportPartDefinition extends BaseDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition;
}
