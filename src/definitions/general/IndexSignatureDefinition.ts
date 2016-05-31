import {applyMixins} from "./../../utils";
import {BaseDefinition, DefinitionType, ReturnTypedDefinition} from "./../base";
import {TypeExpressionDefinition} from "./../expression";

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition {
    keyName: string;
    keyTypeExpression: TypeExpressionDefinition;

    constructor() {
        super(DefinitionType.IndexSignature);
    }

    // ReturnTypedDefinition
    returnTypeExpression: TypeExpressionDefinition;
    setReturnTypeExpression: (text: string) => any;
}

applyMixins(IndexSignatureDefinition, BaseDefinition, [ReturnTypedDefinition]);
