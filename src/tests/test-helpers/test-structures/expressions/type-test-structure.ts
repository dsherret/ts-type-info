import {NamedTestStructure, CallSignatureTestStructure, TypePropertyTestStructure} from "./../definitions";
import {TypeExpressionTestStructure} from "./type-expression-test-structure";

export interface TypeTestStructure {
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeTestStructure[];
    definitions?: NamedTestStructure[];
    text: string;
}
