import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {NamedDefinition, NodedDefinition, BaseDefinition} from "./../base";

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    value: number;

    // NamedDefinition
    name: string;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(EnumMemberDefinition, BaseDefinition, [NamedDefinition, NodedDefinition]);
