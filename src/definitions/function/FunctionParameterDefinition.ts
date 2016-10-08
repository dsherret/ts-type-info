import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {BaseParameterDefinition, NodedDefinition} from "./../base";

export class FunctionParameterDefinition extends BaseParameterDefinition implements NodedDefinition {
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(FunctionParameterDefinition, BaseParameterDefinition, [NodedDefinition]);
