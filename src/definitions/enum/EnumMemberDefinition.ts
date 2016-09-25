import {applyMixins} from "./../../utils";
import {NamedDefinition, BaseDefinition} from "./../base";

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition {
    value: number;

    // NamedDefinition
    name: string;
}

applyMixins(EnumMemberDefinition, BaseDefinition, [NamedDefinition]);
