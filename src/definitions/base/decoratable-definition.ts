import {DecoratorDefinition} from "./../general";
import {WrappedSymbolNode} from "./../../wrappers";
import {DecoratableStructure} from "./../../structures";
import {ArrayExt} from "./../../utils";

export interface IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators(symbolNode: WrappedSymbolNode | DecoratableStructure): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;

    fillDecorators(symbolNodeOrStructure: WrappedSymbolNode | DecoratableStructure) {
        let decorators: DecoratorDefinition<this>[];

        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            decorators = symbolNodeOrStructure.getDecorators().map(decorator => new DecoratorDefinition<this>(decorator, this));
        }
        else {
            decorators = (symbolNodeOrStructure.decorators || []).map(structure => new DecoratorDefinition<this>(structure, this));
        }

        this.decorators = new ArrayExt<DecoratorDefinition<this>>(...decorators);
    }
}
