import {applyMixins} from "./../../utils";
import {NamedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition {
    value: number;

    constructor() {
        super(DefinitionType.EnumMember);
    }

    // NamedDefinition
    name: string;
}

applyMixins(EnumMemberDefinition, BaseDefinition, [NamedDefinition]);
