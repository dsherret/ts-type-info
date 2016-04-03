import {EnumDefinition, EnumMemberDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {EnumMemberWriter} from "./EnumMemberWriter";

export class EnumWriter extends BaseDefinitionWriter<EnumDefinition> {
    private enumMemberWriter = new EnumMemberWriter(this.writer);

    protected writeDefault(def: EnumDefinition, flags: WriteFlags) {
        this.writeExportClause(def, flags);
        this.writeDeclareClause(def);
        this.writer.write("enum " + def.name).block(() => {
            this.writeMembers(def.members, flags);
        });
    }

    private writeMembers(members: EnumMemberDefinition[], flags: WriteFlags) {
        members.forEach((member, i) => {
            this.enumMemberWriter.write(member, flags);

            if (i !== members.length - 1) {
                this.writer.write(",").newLine();
            }
        });
    }
}
