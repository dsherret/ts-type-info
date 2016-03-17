import {DecoratableDefinition, DecoratorDefinition} from "./../../../definitions";

export abstract class DecoratableBinder {
    abstract getDecorators(): DecoratorDefinition<any>[];

    bind(def: DecoratableDefinition) {
        def.decorators.push(...this.getDecorators());
        def.decorators.forEach(d => d.parent = def);
    }
}
