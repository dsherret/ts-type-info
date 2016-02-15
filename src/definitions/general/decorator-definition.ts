import {Expression} from "./../../expressions";
import {WrappedNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {IBaseNamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class DecoratorDefinition<ParentType> extends BaseDefinition implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
    arguments = new ArrayExt<Expression>();

    constructor(declaration: WrappedNode, parent: ParentType) {
        super(DefinitionType.Decorator);
        this.name = declaration.getDecoratorName();
        this.arguments.push(...declaration.getDecoratorArguments().map(arg => new Expression(arg)));
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
