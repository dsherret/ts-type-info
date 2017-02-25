import {BaseParameterStructure} from "./BaseParameterStructure";
import {NamedStructure} from "./NamedStructure";
import {TypeParameteredStructure} from "./TypeParameteredStructure";
import {ParameteredStructure} from "./ParameteredStructure";
import {ReturnTypedStructure} from "./ReturnTypedStructure";
import {BaseStructure} from "./BaseStructure";
import {OverloadSignaturedStructure} from "./OverloadSignaturedStructure";
import {DocumentationedStructure} from "./DocumentationedStructure";
import {UserDefinedTypeGuardedStructure} from "./UserDefinedTypeGuardedStructure";

export interface BaseFunctionStructure<T extends BaseParameterStructure>
        extends BaseStructure, NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure, OverloadSignaturedStructure, DocumentationedStructure,
            UserDefinedTypeGuardedStructure {
    isGenerator?: boolean;
}
