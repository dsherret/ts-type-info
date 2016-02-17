import {Expression} from "./../../expressions";
import {WrappedNode} from "./../../wrappers";
import {DecoratorStructure} from "./../../structures";
import {ArrayExt} from "./../../utils";
import {IBaseNamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class DecoratorDefinition<ParentType> extends BaseDefinition implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
    arguments = new ArrayExt<Expression>();

    constructor(nodeOrStructure: WrappedNode | DecoratorStructure, parent: ParentType) {
        super(DefinitionType.Decorator);

        if (nodeOrStructure instanceof WrappedNode) {
            this.name = nodeOrStructure.getDecoratorName();
            this.arguments.push(...nodeOrStructure.getDecoratorArguments().map(arg => new Expression(arg)));
        }
        else {
            this.name = nodeOrStructure.name;
            this.arguments.push(...(nodeOrStructure.arguments || []).map(arg => new Expression(arg)));
        }

        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
