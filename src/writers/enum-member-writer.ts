import {EnumMemberDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./base-definition-writer";

export class EnumMemberWriter extends BaseDefinitionWriter<EnumMemberDefinition> {
    protected writeDefault(member: EnumMemberDefinition) {
        this.writer.write(member.name + " = " + member.value);
    }
}
