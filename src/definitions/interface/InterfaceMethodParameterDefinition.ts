import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {BaseParameterDefinition, NodedDefinition} from "./../base";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition implements NodedDefinition {
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(InterfaceMethodParameterDefinition, BaseParameterDefinition, [NodedDefinition]);
