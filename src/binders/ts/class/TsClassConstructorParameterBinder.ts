import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassConstructorParameterBinder} from "./../../base";
import {TsBaseParameterBinder, TsDecoratableBinder} from "./../base";

export class TsClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(
            new TsBaseParameterBinder(tsFactory, node),
            new TsDecoratableBinder(node)
        );
    }

    getClassConstructorParameterScope() {
        return this.node.getClassConstructorParameterScope();
    }
}
