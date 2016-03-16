import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins, ArrayExt} from "./../../utils";
import {TsNode} from "./../../wrappers";
import {NamedDefinition, ParentedDefinition, AmbientableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./EnumMemberDefinition";

export class EnumDefinition extends BaseDefinition
                            implements ParentedDefinition<ModuledDefinitions>, ExportableDefinition, AmbientableDefinition {
    members = new ArrayExt<EnumMemberDefinition>();

    constructor() {
        super(DefinitionType.Enum);
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

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition, ParentedDefinition]);
