import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class StarImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition | null;
    name: string;
}
