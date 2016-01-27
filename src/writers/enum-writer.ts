import {EnumDefinition, EnumMemberDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";
import {EnumMemberWriter} from "./enum-member-writer";

export class EnumWriter extends BaseWriter {
    enumMemberWriter = new EnumMemberWriter(this.writer);

    write(def: EnumDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write("enum " + def.name).block(() => {
            this.writeMembers(def.members);
        });
    }

    writeMembers(members: EnumMemberDefinition[]) {
        members.forEach((member, i) => {
            this.enumMemberWriter.write(member);

            if (i !== members.length - 1) {
                this.writer.write(",").newLine();
            }
        });
    }
}
