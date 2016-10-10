import * as typeConstants from "./../../typeConstants";
import {ExportableDefinitions} from "./../../definitions";
import {applyMixins} from "./../../utils";
import {BaseDefinition, NodedDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class DefaultImportPartDefinition extends BaseDefinition implements NodedDefinition {
    definitions: ExportableDefinitions[] = [];
    expression: ExpressionDefinition | null;
    name: string;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(DefaultImportPartDefinition, BaseDefinition, [NodedDefinition]);
