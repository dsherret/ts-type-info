import {EnumDefinition} from "./enum";
import {ClassDefinition} from "./class";
import {FunctionDefinition} from "./function";
import {InterfaceDefinition} from "./interface";
import {NamespaceDefinition} from "./namespace";
import {VariableDefinition} from "./variable";
import {TypeAliasDefinition} from "./general";

export interface InstanceContainer {
    enumType: typeof EnumDefinition;
    classType: typeof ClassDefinition;
    functionType: typeof FunctionDefinition;
    interfaceType: typeof InterfaceDefinition;
    namespaceType: typeof NamespaceDefinition;
    variableType: typeof VariableDefinition;
    typeAliasType: typeof TypeAliasDefinition;
}
