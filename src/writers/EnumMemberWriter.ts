import CodeBlockWriter from "code-block-writer";
import {EnumMemberDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";

export class EnumMemberWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter
    ) {
    }

    write(member: EnumMemberDefinition) {
        this.baseDefinitionWriter.writeWrap(member, () => {
            this.documentationedWriter.write(member);
            this.writer.write(member.name + " = " + member.value);
        });
    }
}
