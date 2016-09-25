import {StructureFactory} from "./../../factories";
import {NamedDefinition, BaseDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[] = [];

    addArgument(text: string) {
        const def = new StructureFactory().getTypeFromText(text);
        this.arguments.push(def);
        return def;
    }

    // NamedDefinition
    name: string;
}
