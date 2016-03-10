import {TypeExpression} from "./../../expressions";
import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class TypeParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpression;

    constructor(mainFactory: MainFactory, node: INode, parent: ParentType) {
        super(DefinitionType.TypeParameter);
        this.fillName(node);
        this.constraintTypeExpression = mainFactory.getTypeExpression(node.getTypeParameterConstraintTypeExpression());
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ParentType;
}

applyMixins(TypeParameterDefinition, [NamedDefinition]);
