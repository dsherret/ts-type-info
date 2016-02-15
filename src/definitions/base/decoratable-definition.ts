import {DecoratorDefinition} from "./../general";
import {WrappedSymbolNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";

export interface IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators(symbolNode: WrappedSymbolNode): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;

    fillDecorators(symbolNode: WrappedSymbolNode) {
        const decorators = symbolNode.getDecorators().map(decorator => new DecoratorDefinition(decorator, this));
        this.decorators = new ArrayExt<DecoratorDefinition<this>>(...decorators);
    }
}
