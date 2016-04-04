import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {EnumMemberStructure} from "./../../structures";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins} from "./../../utils";
import {NamedDefinition, AmbientableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./EnumMemberDefinition";

export class EnumDefinition extends BaseDefinition implements ExportableDefinition, AmbientableDefinition {
    members: EnumMemberDefinition[] = [];

    constructor() {
        super(DefinitionType.Enum);
    }

    addMembers(...members: EnumMemberStructure[]) {
        const factory = new StructureFactory();
        this.members.push(...members.map(m => factory.getEnumMember(m)));
        return this;
    }

    write() {
        const writer = new CodeBlockWriter();
        const enumWriter = new EnumWriter(writer);
        enumWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(EnumDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition]);
