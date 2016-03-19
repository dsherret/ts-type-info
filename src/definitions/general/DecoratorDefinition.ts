import {DecoratedDefinitions} from "./../../definitions";
import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<DecoratedDefinitions> {
    arguments: ExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Decorator);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: DecoratedDefinitions;
}
