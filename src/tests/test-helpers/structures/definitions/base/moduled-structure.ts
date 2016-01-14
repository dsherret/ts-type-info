import {NamespaceStructure} from "./../namespace";
import {ClassStructure} from "./../class";
import {InterfaceStructure} from "./../interface";
import {FunctionStructure} from "./../function";
import {EnumStructure} from "./../enum";

export interface ModuledStructure {
    namespaces?: NamespaceStructure[];
    classes?: ClassStructure[];
    interfaces?: InterfaceStructure[];
    functions?: FunctionStructure[];
    enums?: EnumStructure[];
}
