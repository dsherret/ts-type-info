import {DecoratorDefinition, ExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {NodedBinder} from "./../base/NodedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class DecoratorBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getArguments(): ExpressionDefinition[];
    abstract getIsDecoratorFactory(): boolean;

    bind(def: DecoratorDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.nodedBinder.bind(def);
        def.arguments.push(...this.getArguments());
        def.isDecoratorFactory = this.getIsDecoratorFactory();
    }
}
