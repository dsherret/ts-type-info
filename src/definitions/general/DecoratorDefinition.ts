import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class DecoratorDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType> {
    arguments: ExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Decorator);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
