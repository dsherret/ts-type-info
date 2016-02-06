import {EnumDefinition, EnumMemberDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {EnumMemberWriter} from "./enum-member-writer";

export class EnumWriter extends BaseDefinitionWriter<EnumDefinition> {
    private enumMemberWriter = new EnumMemberWriter(this.writer, this.flags);

    protected writeDefault(def: EnumDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write("enum " + def.name).block(() => {
            this.writeMembers(def.members);
        });
    }

    private writeMembers(members: EnumMemberDefinition[]) {
        members.forEach((member, i) => {
            this.enumMemberWriter.write(member);

            if (i !== members.length - 1) {
                this.writer.write(",").newLine();
            }
        });
    }
}
