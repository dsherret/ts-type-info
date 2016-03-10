import {EnumMemberDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class EnumMemberWriter extends BaseDefinitionWriter<EnumMemberDefinition> {
    protected writeDefault(member: EnumMemberDefinition) {
        this.writer.write(member.name + " = " + member.value);
    }
}
