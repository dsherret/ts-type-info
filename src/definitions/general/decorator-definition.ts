import {Expression} from "./../../expressions";
import {INode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {IBaseNamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class DecoratorDefinition<ParentType> extends BaseDefinition implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
    arguments = new ArrayExt<Expression>();

    constructor(node: INode, parent: ParentType) {
        super(DefinitionType.Decorator);
        this.name = node.getDecoratorName();
        this.arguments.push(...node.getDecoratorArguments().map(arg => new Expression(arg)));
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
