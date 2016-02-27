import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {Expression} from "./../../expressions";
import {DefinitionType} from "./definition-type";
import {DefaultExpressionedDefinition, IDefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BasePropertyDefinition} from "./base-property-definition";

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
    constructor(mainFactory: MainFactory, node: INode, parent: ParentType, definitionType: DefinitionType) {
        super(mainFactory, node, parent, definitionType);

        this.fillDefaultExpression(node);
    }

    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (node: INode) => void;
}

applyMixins(ObjectPropertyDefinition, [DefaultExpressionedDefinition]);
