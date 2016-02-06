import {BaseParameterStructure} from "./base-parameter-structure";
import {NamedStructure} from "./named-structure";
import {TypeParameteredStructure} from "./type-parametered-structure";
import {ParameteredStructure} from "./parametered-structure";
import {ReturnTypedStructure} from "./return-typed-structure";

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
}
