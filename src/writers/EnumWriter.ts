import CodeBlockWriter from "code-block-writer";
import {EnumDefinition, EnumMemberDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {EnumMemberWriter} from "./EnumMemberWriter";
import {ExportableWriter} from "./ExportableWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";

export class EnumWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientableWriter: AmbientableWriter,
        private readonly enumMemberWriter: EnumMemberWriter
    ) {
    }

    write(def: EnumDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.documentationedWriter.write(def);
            this.exportableWriter.writeExportKeyword(def, flags);
            this.ambientableWriter.writeDeclareKeyword(def);
            this.writer.conditionalWrite(def.isConst, "const ");
            this.writer.write("enum " + def.name).block(() => {
                this.writeMembers(def.members);
            });
        });
    }

    private writeMembers(members: EnumMemberDefinition[]) {
        members.forEach((member, i) => {
            this.enumMemberWriter.write(member);

            if (i !== members.length - 1)
                this.writer.write(",").newLine();
        });
    }
}
