import {CallSignatureStructure} from "./../general";
import {BaseParameterStructure} from "./BaseParameterStructure";
import {NamedStructure} from "./NamedStructure";
import {TypeParameteredStructure} from "./TypeParameteredStructure";
import {ParameteredStructure} from "./ParameteredStructure";
import {ReturnTypedStructure} from "./ReturnTypedStructure";

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
    overloadSignatures?: CallSignatureStructure[];
}
