import {TypeExpression} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
    fillTypeExpression(mainCache: MainCache, symbolNode: ISymbolNode): void;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(mainCache: MainCache, symbolNode: ISymbolNode) {
        this.typeExpression = mainCache.getTypeExpression(symbolNode.getTypeExpression());
    }
}
