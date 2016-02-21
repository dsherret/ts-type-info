import {TypeExpression} from "./../../expressions";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(mainFactory: MainFactory, symbolNode: ISymbolNode): void;
    fillReturnTypeExpressionBySignature(mainFactory: MainFactory, signature: ISignature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(mainFactory: MainFactory, symbolNode: ISymbolNode) {
        this.returnTypeExpression = mainFactory.getTypeExpression(symbolNode.getReturnTypeExpression());
    }

    fillReturnTypeExpressionBySignature(mainFactory: MainFactory, signature: ISignature) {
        this.returnTypeExpression = mainFactory.getTypeExpression(signature.getReturnTypeExpression());
    }
}
