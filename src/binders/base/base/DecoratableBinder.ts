import {DecoratableDefinition, DecoratorDefinition, DecoratedDefinitions} from "./../../../definitions";

export abstract class DecoratableBinder {
    abstract getDecorators(): DecoratorDefinition[];

    bind(def: DecoratableDefinition) {
        def.decorators.push(...this.getDecorators());
        def.decorators.forEach(d => d.parent = def as DecoratedDefinitions);
    }
}
