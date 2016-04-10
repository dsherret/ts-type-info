import {NamespaceTestStructure} from "./../namespace";
import {ClassTestStructure} from "./../class";
import {InterfaceTestStructure} from "./../interface";
import {FunctionTestStructure} from "./../function";
import {EnumTestStructure} from "./../enum";
import {VariableTestStructure} from "./../variable";
import {TypeAliasTestStructure} from "./../general";
import {NamedTestStructure} from "./NamedTestStructure";
import {ExportableTestStructure} from "./ExportableTestStructure";

export interface ModuledTestStructure {
    namespaces?: NamespaceTestStructure[];
    classes?: ClassTestStructure[];
    interfaces?: InterfaceTestStructure[];
    functions?: FunctionTestStructure[];
    enums?: EnumTestStructure[];
    variables?: VariableTestStructure[];
    typeAliases?: TypeAliasTestStructure[];
    exports?: (NamedTestStructure & ExportableTestStructure)[];
}
