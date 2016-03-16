import {DecoratorDefinition} from "./../../../definitions";
import {Expression} from "./../../../expressions";
import {TsNode} from "./../../../wrappers";
import {NamedBinder, DecoratorBinder} from "./../../base";

export class TsDecoratorBinder extends DecoratorBinder {
    constructor(private node: TsNode) {
        super(new TsDecoratorNameBinder(node));
    }

    getArguments() {
        return this.node.getDecoratorArguments().map(arg => new Expression(arg));
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
