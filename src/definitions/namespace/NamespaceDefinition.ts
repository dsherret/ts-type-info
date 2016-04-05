import CodeBlockWriter from "code-block-writer";
import {ExportableDefinitions} from "./../../definitions";
import {InterfaceStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {ModuledDefinition, NamedDefinition, ExportableDefinition, AmbientableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {NamespaceDeclarationType} from "./NamespaceDeclarationType";

export class NamespaceDefinition extends BaseDefinition
                                 implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition {
    declarationType: NamespaceDeclarationType;

    constructor() {
        super(DefinitionType.Namespace);
    }

    write() {
        const writer = new CodeBlockWriter();
        const flags = WriteFlags.Default;
        const namespaceWriter = new NamespaceWriter(writer, new ModuledWriter(writer));
        namespaceWriter.write(this, flags);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // ModuledDefinition
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
    getExports: () => ExportableDefinitions[];
    addInterfaces: (...interfaces: InterfaceStructure[]) => this;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(NamespaceDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition]);
