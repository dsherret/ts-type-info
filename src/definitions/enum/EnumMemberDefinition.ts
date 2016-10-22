import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {NamedDefinition, NodedDefinition, BaseDefinition, JsDocedDefinition} from "./../base";

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition, JsDocedDefinition {
    value: number;

    // NamedDefinition
    name: string;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // JsDocedDefinition
    jsDocText: string;
}

applyMixins(EnumMemberDefinition, BaseDefinition, [NamedDefinition, NodedDefinition, JsDocedDefinition]);
