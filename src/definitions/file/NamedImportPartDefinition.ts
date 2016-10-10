import {ExportableDefinitions} from "./../../definitions";
import {applyMixins} from "./../../utils";
import {BaseDefinition, NodedDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class NamedImportPartDefinition extends BaseDefinition implements NodedDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition | null;
    alias: string | null;
    name: string;
}

applyMixins(NamedImportPartDefinition, BaseDefinition, [NodedDefinition]);
