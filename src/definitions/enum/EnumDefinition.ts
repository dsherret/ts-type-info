import {MainFactory, StructureFactory} from "./../../factories";
import {EnumMemberStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {AmbientableDefinition, ExportableDefinition, NamedDefinition, OrderableDefinition, BaseDefinition} from "./../base";
import {EnumMemberDefinition} from "./EnumMemberDefinition";

export class EnumDefinition extends BaseDefinition implements AmbientableDefinition, ExportableDefinition, OrderableDefinition {
    isConst: boolean;
    members: EnumMemberDefinition[] = [];

    addMember(structure: EnumMemberStructure) {
        const def = new StructureFactory().getEnumMember(structure);
        this.members.push(def);
        return def;
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
    // OrderableDefinition
    order: number;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(EnumDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition, OrderableDefinition]);
