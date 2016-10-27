import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {NamedDefinition, NodedDefinition, BaseDefinition, DocumentationedDefinition} from "./../base";

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition, DocumentationedDefinition {
    value: number;

    // NamedDefinition
    name: string;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // DocumentationedDefinition
    documentationComment: string;
}

applyMixins(EnumMemberDefinition, BaseDefinition, [NamedDefinition, NodedDefinition, DocumentationedDefinition]);
