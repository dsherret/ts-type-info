import {BaseParameterStructure} from "./base-parameter-structure";
import {NamedStructure, TypeParameteredStructure} from "./../../base";
import {ParameteredStructure} from "./parametered-structure";
import {ReturnTypedStructure} from "./return-typed-structure";

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
}
