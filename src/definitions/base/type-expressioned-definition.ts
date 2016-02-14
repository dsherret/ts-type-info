import {TypeExpression} from "./../../expressions";
import {WrappedSymbolNode} from "./../../wrappers";

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
    fillTypeExpression(symbolNode: WrappedSymbolNode): void;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(symbolNode: WrappedSymbolNode) {
        this.typeExpression = symbolNode.getTypeExpression();
    }
}
