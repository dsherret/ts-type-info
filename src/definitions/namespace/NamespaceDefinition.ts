import * as typeConstants from "./../../typeConstants";
import {ExportableDefinitions, ModuleMemberDefinitions} from "./../../definitions";
import {MainFactory} from "./../../factories";
import {ClassStructure, EnumStructure, FunctionStructure, InterfaceStructure, TypeAliasStructure, NamespaceStructure, VariableStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {ModuledDefinition, NamedDefinition, ExportableDefinition, AmbientableDefinition, BaseDefinition, OrderableDefinition, NodedDefinition, JsDocedDefinition} from "./../base";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {NamespaceDeclarationType} from "./NamespaceDeclarationType";

export class NamespaceDefinition extends BaseDefinition
        implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition, JsDocedDefinition {
    declarationType: NamespaceDeclarationType;

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const flags = WriteFlags.Default;
        const namespaceWriter = new NamespaceWriter(writer, new ModuledWriter(writer));
        namespaceWriter.write(this, flags);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // ModuledDefinition
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
    getExports: () => ExportableDefinitions[];
    addClass: (structure: ClassStructure) => ClassDefinition;
    addEnum: (structure: EnumStructure) => EnumDefinition;
    addFunction: (structure: FunctionStructure) => FunctionDefinition;
    addInterface: (structure: InterfaceStructure) => InterfaceDefinition;
    addNamespace: (structure: NamespaceStructure) => NamespaceDefinition;
    addTypeAlias: (structure: TypeAliasStructure) => TypeAliasDefinition;
    addVariable: (structure: VariableStructure) => VariableDefinition;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => (ClassDefinition | null);
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => (EnumDefinition | null);
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => (FunctionDefinition | null);
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => (InterfaceDefinition | null);
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => (NamespaceDefinition | null);
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => (TypeAliasDefinition | null);
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => (VariableDefinition | null);
    directlyContains: (def: ModuleMemberDefinitions) => boolean;
    getNamespacesToDefinition: (searchDef: ModuleMemberDefinitions) => (NamespaceDefinition[] | null);
    getMembers: () => ModuleMemberDefinitions[];
    setOrderOfMember: (order: number, member: ModuleMemberDefinitions) => this;
    // OrderableDefinition
    order: number;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // JsDocedDefinition
    jsDocText: string;
}

applyMixins(NamespaceDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition,
    JsDocedDefinition]);
