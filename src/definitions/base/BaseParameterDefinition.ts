import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {Expression, TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./NamedDefinition";
import {IParentedDefinition} from "./ParentedDefinition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./typeExpressionedDefinition";
import {IDefaultExpressionedDefinition, DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";

export interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
    new(mainFactory: MainFactory, node: INode, parent: ParentType): ParameterType;
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition
                                                 implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(mainFactory: MainFactory, node: INode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);

        this.fillName(node);
        this.fillTypeExpression(mainFactory, node);
        this.fillDefaultExpression(node);

        this.isOptional = node.isParameterOptional();
        this.isRestParameter = node.isRestParameter();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (mainFactory: MainFactory, node: INode) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (node: INode) => void;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
