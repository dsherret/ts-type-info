import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class NamedImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition | null;
    alias: string | null;
    name: string;
}
