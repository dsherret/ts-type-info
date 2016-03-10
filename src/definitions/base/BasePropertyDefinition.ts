import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./NamedDefinition";
import {IParentedDefinition} from "./ParentedDefinition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./typeExpressionedDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseDefinition} from "./BaseDefinition";

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;

    constructor(mainFactory: MainFactory, node: INode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(node);
        this.fillTypeExpression(mainFactory, node);

        this.isOptional = node.isPropertyOptional();
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
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
