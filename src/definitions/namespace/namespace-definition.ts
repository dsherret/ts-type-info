import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions, ExportableDefinitions} from "./../../definitions";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {IModuledDefinition, ModuledDefinition, INamedDefinition, NamedDefinition, IParentedDefinition, IExportableDefinition, ExportableDefinition,
        IAmbientableDefinition, AmbientableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {NamespaceDeclarationType} from "./namespace-declaration-type";

export class NamespaceDefinition extends BaseDefinition
                                 implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, IModuledDefinition, IAmbientableDefinition {
    declarationType: NamespaceDeclarationType;

    constructor(mainFactory: MainFactory, node: INode) {
        super(DefinitionType.Namespace);
        this.fillName(node);
        this.fillExportable(node);
        this.fillAmbientable(node);
        this.fillMembersByNode(mainFactory, node);
        this.declarationType = node.getNamespaceDeclarationType();
    }

    write() {
        const writer = new CodeBlockWriter();
        const flags = WriteFlags.Default;
        const namespaceWriter = new NamespaceWriter(writer, new ModuledWriter(writer, flags), flags);
        namespaceWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ModuledDefinition
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    exports: ArrayExt<ExportableDefinitions>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
    fillMembersByNode: (mainFactory: MainFactory, node: INode) => void;
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

applyMixins(NamespaceDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition]);
