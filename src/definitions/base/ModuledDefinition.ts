import {ExportableDefinitions, ModuleMemberDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {ClassStructure, EnumStructure, FunctionStructure, InterfaceStructure, NamespaceStructure, TypeAliasStructure, VariableStructure} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";

export abstract class ModuledDefinition {
    namespaces: NamespaceDefinition[] = [];
    classes: ClassDefinition[] = [];
    interfaces: InterfaceDefinition[] = [];
    enums: EnumDefinition[] = [];
    functions: FunctionDefinition[] = [];
    variables: VariableDefinition[] = [];
    typeAliases: TypeAliasDefinition[] = [];

    addClass(structure: ClassStructure) {
        const def = new StructureFactory().getClass(structure);
        this.classes.push(def);
        return def;
    }

    addEnum(structure: EnumStructure) {
        const def = new StructureFactory().getEnum(structure);
        this.enums.push(def);
        return def;
    }

    addFunction(structure: FunctionStructure) {
        const def = new StructureFactory().getFunction(structure);
        this.functions.push(def);
        return def;
    }

    addInterface(structure: InterfaceStructure) {
        const def = new StructureFactory().getInterface(structure);
        this.interfaces.push(def);
        return def;
    }

    addNamespace(structure: NamespaceStructure) {
        const def = new StructureFactory().getNamespace(structure);
        this.namespaces.push(def);
        return def;
    }

    addTypeAlias(structure: TypeAliasStructure) {
        const def = new StructureFactory().getTypeAlias(structure);
        this.typeAliases.push(def);
        return def;
    }

    addVariable(structure: VariableStructure) {
        const def = new StructureFactory().getVariable(structure);
        this.variables.push(def);
        return def;
    }

    getClass(nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.classes, nameOrSearchFunction);
    }

    getEnum(nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.enums, nameOrSearchFunction);
    }

    getFunction(nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.functions, nameOrSearchFunction);
    }

    getInterface(nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.interfaces, nameOrSearchFunction);
    }

    getNamespace(nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.namespaces, nameOrSearchFunction);
    }

    getTypeAlias(nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.typeAliases, nameOrSearchFunction);
    }

    getVariable(nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.variables, nameOrSearchFunction);
    }

    directlyContains(def: ModuleMemberDefinitions): boolean {
        if (def.isClassDefinition()) {
            return this.getClass(d => d === def) != null;
        }
        else if (def.isFunctionDefinition()) {
            return this.getFunction(d => d === def) != null;
        }
        else if (def.isInterfaceDefinition()) {
            return this.getInterface(d => d === def) != null;
        }
        else if (def.isNamespaceDefinition()) {
            return this.getNamespace(d => d === def) != null;
        }
        else if (def.isEnumDefinition()) {
            return this.getEnum(d => d === def) != null;
        }
        else if (def.isTypeAliasDefinition()) {
            return this.getTypeAlias(d => d === def) != null;
        }
        else if (def.isVariableDefinition()) {
            return this.getVariable(d => d === def) != null;
        }
        else {
            return null;
        }
    }

    getNamespacesToDefinition(searchDef: ModuleMemberDefinitions): NamespaceDefinition[] {
        const foundInModule = this.directlyContains(searchDef);

        if (foundInModule) {
            return [];
        }
        else {
            for (let i = 0; i < this.namespaces.length; i++) {
                let path = this.namespaces[i].getNamespacesToDefinition(searchDef);
                if (path != null) {
                    return [this.namespaces[i], ...path];
                }
            }

            return null;
        }
    }

    getExports(): ExportableDefinitions[] {
        return this.getMembers().filter(d => d.isExported && !d.isDefaultExportOfFile);
    }

    getMembers(): ModuleMemberDefinitions[] {
        return [
            ...this.namespaces,
            ...this.classes,
            ...this.interfaces,
            ...this.enums,
            ...this.functions,
            ...this.variables,
            ...this.typeAliases
        ];
    }
}
