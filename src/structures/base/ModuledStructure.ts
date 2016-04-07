﻿import {NamespaceStructure} from "./../namespace";
import {ClassStructure} from "./../class";
import {InterfaceStructure} from "./../interface";
import {FunctionStructure} from "./../function";
import {EnumStructure} from "./../enum";
import {VariableStructure} from "./../variable";
import {TypeAliasStructure} from "./../general";

export interface ModuledStructure {
    namespaces?: NamespaceStructure[];
    classes?: ClassStructure[];
    interfaces?: InterfaceStructure[];
    functions?: FunctionStructure[];
    enums?: EnumStructure[];
    variables?: VariableStructure[];
    typeAliases?: TypeAliasStructure[];
}
