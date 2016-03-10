import {DecoratorDefinition} from "./../general";
import {INode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";

export interface IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators(node: INode): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;

    fillDecorators(node: INode) {
        let decorators: DecoratorDefinition<this>[];

        decorators = node.getDecorators().map(decorator => new DecoratorDefinition<this>(decorator, this));

        this.decorators = new ArrayExt<DecoratorDefinition<this>>(...decorators);
    }
}
