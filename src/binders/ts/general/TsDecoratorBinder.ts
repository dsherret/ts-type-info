import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {NamedBinder, DecoratorBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinder} from "./../base";

export class TsDecoratorBinder extends DecoratorBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsDecoratorNameBinder(node),
            new TsNodedBinder(factory, node)
        );
    }

    getArguments() {
        return this.node.getDecoratorArguments().map(arg => this.factory.getExpression(arg));
    }

    getIsDecoratorFactory() {
        return this.node.getIsDecoratorFactory();
    }
}

class TsDecoratorNameBinder extends NamedBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getName() {
        return this.node.getDecoratorName();
    }
}
