import {TypeExpression} from "./../../expressions";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(mainCache: MainCache, symbolNode: ISymbolNode): void;
    fillReturnTypeExpressionBySignature(mainCache: MainCache, signature: ISignature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(mainCache: MainCache, symbolNode: ISymbolNode) {
        this.returnTypeExpression = mainCache.getTypeExpression(symbolNode.getReturnTypeExpression());
    }

    fillReturnTypeExpressionBySignature(mainCache: MainCache, signature: ISignature) {
        this.returnTypeExpression = mainCache.getTypeExpression(signature.getReturnTypeExpression());
    }
}
