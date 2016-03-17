import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassConstructorParameterBinder} from "./../../base";
import {TsBaseParameterBinder, TsDecoratableBinder} from "./../base";

export class TsClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsBaseParameterBinder(mainFactory, node),
            new TsDecoratableBinder(node)
        );
    }

    getClassConstructorParameterScope() {
        return this.node.getClassConstructorParameterScope();
    }
}
