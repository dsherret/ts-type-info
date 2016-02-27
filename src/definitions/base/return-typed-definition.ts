import {TypeExpression} from "./../../expressions";
import {ISignature, INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(mainFactory: MainFactory, node: INode): void;
    fillReturnTypeExpressionBySignature(mainFactory: MainFactory, signature: ISignature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(mainFactory: MainFactory, node: INode) {
        this.returnTypeExpression = mainFactory.getTypeExpression(node.getReturnTypeExpression());
    }

    fillReturnTypeExpressionBySignature(mainFactory: MainFactory, signature: ISignature) {
        this.returnTypeExpression = mainFactory.getTypeExpression(signature.getReturnTypeExpression());
    }
}
