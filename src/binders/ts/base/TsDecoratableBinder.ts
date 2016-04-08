import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {DecoratableBinder} from "./../../base";

export class TsDecoratableBinder extends DecoratableBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    getDecorators() {
        return this.node.getDecorators().map(decoratorNode => this.factory.getDecorator(decoratorNode));
    }
}
