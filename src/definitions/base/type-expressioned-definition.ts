import {TypeExpression} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
    fillTypeExpression(mainFactory: MainFactory, symbolNode: ISymbolNode): void;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(mainFactory: MainFactory, symbolNode: ISymbolNode) {
        this.typeExpression = mainFactory.getTypeExpression(symbolNode.getTypeExpression());
    }
}
