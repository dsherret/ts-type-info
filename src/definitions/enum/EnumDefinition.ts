import {MainFactory, StructureFactory} from "./../../factories";
import {EnumMemberStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {NamedDefinition, AmbientableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./EnumMemberDefinition";

export class EnumDefinition extends BaseDefinition implements ExportableDefinition, AmbientableDefinition {
    isConst: boolean;
    members: EnumMemberDefinition[] = [];

    constructor() {
        super(DefinitionType.Enum);
    }

    addMembers(...members: EnumMemberStructure[]) {
        const factory = new StructureFactory();
        this.members.push(...members.map(m => factory.getEnumMember(m)));
        return this;
    }

    getMember(nameOrSearchFunction: string | ((member: EnumMemberDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.members, nameOrSearchFunction);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
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
