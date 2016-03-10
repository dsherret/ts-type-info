import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {Expression} from "./../../expressions";
import {DefinitionType} from "./DefinitionType";
import {DefaultExpressionedDefinition, IDefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BasePropertyDefinition} from "./BasePropertyDefinition";

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
