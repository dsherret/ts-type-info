import {TypeExpression} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
    fillTypeExpression(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode): void;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) {
        this.typeExpression = definitionFactory.getTypeExpression(symbolNode.getTypeExpression());
    }
}
