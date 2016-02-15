import {DecoratorDefinition} from "./../general";
import {WrappedSymbolNode} from "./../../wrappers";
import {ExtendedArray} from "./../../utils";

export interface IDecoratableDefinition {
    decorators: ExtendedArray<DecoratorDefinition<this>>;
    fillDecorators(symbolNode: WrappedSymbolNode): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: ExtendedArray<DecoratorDefinition<this>>;

    fillDecorators(symbolNode: WrappedSymbolNode) {
        const decorators = symbolNode.getDecorators().map(decorator => new DecoratorDefinition(decorator, this));
        this.decorators = new ExtendedArray<DecoratorDefinition<this>>(...decorators);
    }
}
