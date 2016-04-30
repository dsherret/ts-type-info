import {BaseTestStructure, ReturnTypedTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../expression";

export interface IndexSignatureTestStructure extends BaseTestStructure, ReturnTypedTestStructure {
    keyName: string;
    keyTypeExpression: TypeExpressionTestStructure;
}
