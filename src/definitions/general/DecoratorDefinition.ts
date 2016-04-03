import {DecoratedDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<DecoratedDefinitions> {
    arguments: ExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Decorator);
    }

    addArguments(...args: string[]) {
        const factory = new StructureFactory();
        args.forEach(arg => {
            this.arguments.push(factory.getTypeExpressionFromText(arg));
        });
        return this;
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: DecoratedDefinitions;
}
