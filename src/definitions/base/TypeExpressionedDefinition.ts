import {TypeExpression} from "./../../expressions";
import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
    fillTypeExpression(mainFactory: MainFactory, node: INode): void;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(mainFactory: MainFactory, node: INode) {
        this.typeExpression = mainFactory.getTypeExpression(node.getTypeExpression());
    }
}
