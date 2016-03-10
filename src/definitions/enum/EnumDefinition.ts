import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../writeFlags";
import {applyMixins, ArrayExt} from "./../../utils";
import {INode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./EnumMemberDefinition";

export class EnumDefinition extends BaseDefinition
                            implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, IAmbientableDefinition {
    members = new ArrayExt<EnumMemberDefinition>();

    constructor(node: INode) {
        super(DefinitionType.Enum);
        this.fillName(node);
        this.fillExportable(node);
        this.fillAmbientable(node);
        this.fillEnumMembers(node);
    }

    write() {
        const writer = new CodeBlockWriter();
        const enumWriter = new EnumWriter(writer, WriteFlags.Default);
        enumWriter.write(this);
        return writer.toString();
    }

    private fillEnumMembers(node: INode) {
        this.members.push(...node.getSymbol().getExportSymbols().map(memberSymbol => {
            const memberNode = memberSymbol.getOnlyNode();
            return new EnumMemberDefinition(memberNode, this);
        }));
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (node: INode) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (node: INode) => void;
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition]);
