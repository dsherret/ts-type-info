import {TypeExpression} from "./../../expressions";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode): void;
    fillReturnTypeExpressionBySignature(definitionFactory: IDefinitionFactory, signature: ISignature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) {
        this.returnTypeExpression = definitionFactory.getTypeExpression(symbolNode.getReturnTypeExpression());
    }

    fillReturnTypeExpressionBySignature(definitionFactory: IDefinitionFactory, signature: ISignature) {
        this.returnTypeExpression = definitionFactory.getTypeExpression(signature.getReturnTypeExpression());
    }
}
