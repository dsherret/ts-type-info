import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class DefaultImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition;
    name: string;
}
