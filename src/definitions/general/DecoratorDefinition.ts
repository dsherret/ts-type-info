import {StructureFactory} from "./../../factories";
import {NamedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Decorator);
    }

    addArguments(...args: string[]) {
        const factory = new StructureFactory();
        this.arguments.push(...args.map(arg => factory.getTypeExpressionFromText(arg)));
        return this;
    }

    // NamedDefinition
    name: string;
}
