import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassConstructorParameterBinder} from "./../../base";
import {TsBaseParameterBinder, TsDecoratableBinder} from "./../base";

export class TsClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseParameterBinder(factory, node),
            new TsDecoratableBinder(factory, node)
        );
    }

    getClassConstructorParameterScope() {
        return this.node.getClassConstructorParameterScope();
    }
}
