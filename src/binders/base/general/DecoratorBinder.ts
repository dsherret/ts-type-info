import {DecoratorDefinition, ExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class DecoratorBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder
    ) {
    }

    abstract getArguments(): ExpressionDefinition[];

    bind(def: DecoratorDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        def.arguments.push(...this.getArguments());
    }
}
