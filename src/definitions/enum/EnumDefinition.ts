import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {EnumMemberStructure} from "./../../structures";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins} from "./../../utils";
import {NamedDefinition, ParentedDefinition, AmbientableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./EnumMemberDefinition";

export class EnumDefinition extends BaseDefinition
                            implements ParentedDefinition<ModuledDefinitions>, ExportableDefinition, AmbientableDefinition {
    members: EnumMemberDefinition[] = [];

    constructor() {
        super(DefinitionType.Enum);
    }

    addMembers(...members: EnumMemberStructure[]) {
        const factory = new StructureFactory();
        members.forEach(member => {
            const def = factory.getEnumMember(member);
            def.parent = this;
            this.members.push(def);
        });
        return this;
    }

    write() {
        const writer = new CodeBlockWriter();
        const enumWriter = new EnumWriter(writer, WriteFlags.Default);
        enumWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(EnumDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition, ParentedDefinition]);
