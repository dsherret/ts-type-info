import {BaseTestStructure} from "./BaseTestStructure";
import {BaseParameterTestStructure} from "./BaseParameterTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {TypeParameteredTestStructure} from "./TypeParameteredTestStructure";
import {ParameteredTestStructure} from "./ParameteredTestStructure";
import {ReturnTypedTestStructure} from "./ReturnTypedTestStructure";
import {OverloadSignaturedTestStructure} from "./OverloadSignaturedTestStructure";
import {UserDefinedTypeGuardTestStructure} from "./../general";

export interface BaseFunctionTestStructure<T extends BaseParameterTestStructure>
        extends BaseTestStructure, NamedTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<T>, ReturnTypedTestStructure, OverloadSignaturedTestStructure {
    userDefinedTypeGuard?: UserDefinedTypeGuardTestStructure;
    isGenerator?: boolean;
}
