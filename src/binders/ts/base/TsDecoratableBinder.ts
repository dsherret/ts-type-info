import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {DecoratableBinder} from "./../../base";

export class TsDecoratableBinder extends DecoratableBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getDecorators() {
        return this.node.getDecorators().map(decoratorNode => this.factory.getDecorator(decoratorNode));
    }
}
