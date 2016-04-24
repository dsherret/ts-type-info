import {BaseTestStructure, ReturnTypedTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../expressions";

export interface IndexSignatureTestStructure extends BaseTestStructure, ReturnTypedTestStructure {
    keyName: string;
    keyTypeExpression: TypeExpressionTestStructure;
}
