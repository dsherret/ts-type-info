import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {NamedBinder, DecoratorBinder} from "./../../base";

export class TsDecoratorBinder extends DecoratorBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(new TsDecoratorNameBinder(node));
    }

    getArguments() {
        return this.node.getDecoratorArguments().map(arg => this.factory.getExpression(arg));
    }
}

class TsDecoratorNameBinder extends NamedBinder {
    constructor(private node: TsNode) {
        super();
    }

    getName() {
        return this.node.getDecoratorName();
    }
}
