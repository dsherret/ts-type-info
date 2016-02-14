import {IBaseNamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {Expression} from "./../../expressions";
import {WrappedNode} from "./../../wrappers";

export class DecoratorDefinition<ParentType> extends BaseDefinition implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
    arguments: Expression[] = [];

    constructor(declaration: WrappedNode, parent: ParentType) {
        super(DefinitionType.Decorator);
        this.name = declaration.getDecoratorName();
        this.arguments = declaration.getDecoratorArguments().map(arg => new Expression(arg));
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
