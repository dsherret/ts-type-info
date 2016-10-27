import {EnumMemberDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";

export class EnumMemberWriter extends BaseDefinitionWriter<EnumMemberDefinition> {
    private readonly documentationedWriter = new DocumentationedWriter(this.writer);

    protected writeDefault(member: EnumMemberDefinition) {
        this.documentationedWriter.write(member);
        this.writer.write(member.name + " = " + member.value);
    }
}
