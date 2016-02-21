import {DecoratorDefinition} from "./../general";
import {ISymbolNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";

export interface IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators(symbolNode: ISymbolNode): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;

    fillDecorators(symbolNode: ISymbolNode) {
        let decorators: DecoratorDefinition<this>[];

        decorators = symbolNode.getDecorators().map(decorator => new DecoratorDefinition<this>(decorator, this));

        this.decorators = new ArrayExt<DecoratorDefinition<this>>(...decorators);
    }
}
