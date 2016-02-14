import {DecoratorDefinition} from "./../general";
import {WrappedSymbolNode} from "./../../wrappers";

export interface IDecoratableDefinition {
    decorators: DecoratorDefinition<this>[];
    fillDecorators(symbolNode: WrappedSymbolNode): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: DecoratorDefinition<this>[];

    fillDecorators(symbolNode: WrappedSymbolNode) {
        this.decorators = symbolNode.getDecorators().map(decorator => new DecoratorDefinition(decorator, this));
    }
}
