import {applyMixins} from "./../../utils";
import {TsNode} from "./../../compiler"
import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumDefinition} from "./EnumDefinition";

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<EnumDefinition> {
    value: number;

    constructor() {
        super(DefinitionType.EnumMember);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, BaseDefinition, [NamedDefinition]);
