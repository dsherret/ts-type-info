import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions, ExportableDefinitions} from "./../../definitions";
import {applyMixins, DefinitionCache, ExtendedArray} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
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

    constructor(definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode) {
        super(DefinitionType.Namespace);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillAmbientable(symbolNode);
        this.fillMembersByNode(definitionCache, symbolNode);
        this.declarationType = symbolNode.getDeclarationType();
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
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ModuledDefinition
    namespaces: ExtendedArray<NamespaceDefinition>;
    classes: ExtendedArray<ClassDefinition>;
    interfaces: ExtendedArray<InterfaceDefinition>;
    enums: ExtendedArray<EnumDefinition>;
    functions: ExtendedArray<FunctionDefinition>;
    variables: ExtendedArray<VariableDefinition>;
    exports: ExtendedArray<ExportableDefinitions>;
    typeAliases: ExtendedArray<TypeAliasDefinition>;
    fillMembersByNode: (definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: WrappedSymbolNode) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(NamespaceDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition]);
