import {DecoratorDefinition} from "./../../../definitions";
import {Expression} from "./../../../expressions";
import {NamedBinder} from "./../base/NamedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class DecoratorBinder implements IBaseBinder {
    constructor(private namedBinder: NamedBinder) {
    }

    abstract getArguments(): Expression[];

    bind(def: DecoratorDefinition<any>) {
        this.namedBinder.bind(def);
        def.arguments.push(...this.getArguments());
    }
}
