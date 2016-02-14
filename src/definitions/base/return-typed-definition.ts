import {TypeExpression} from "./../../expressions";
import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(symbolNode: WrappedSymbolNode): void;
    fillReturnTypeExpressionBySignature(signature: WrappedSignature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(symbolNode: WrappedSymbolNode) {
        this.returnTypeExpression = symbolNode.getReturnTypeExpression();
    }

    fillReturnTypeExpressionBySignature(signature: WrappedSignature) {
        this.returnTypeExpression = signature.getReturnTypeExpression();
    }
}
