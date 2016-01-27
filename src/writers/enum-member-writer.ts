import {EnumMemberDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";

export class EnumMemberWriter extends BaseWriter {
    write(member: EnumMemberDefinition) {
        this.writer.write(member.name + " = " + member.value);
    }
}
