import {ReturnTypedTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../expressions";

export interface IndexSignatureTestStructure extends ReturnTypedTestStructure {
    keyName: string;
    keyTypeExpression: TypeExpressionTestStructure;
}
