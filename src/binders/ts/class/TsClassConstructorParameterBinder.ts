import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassConstructorParameterBinder} from "./../../base";
import {TsBaseParameterBinder, TsDecoratableBinder, TsReadonlyableBinderByNode, TsNodedBinder} from "./../base";

export class TsClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseParameterBinder(factory, node),
            new TsDecoratableBinder(factory, node),
            new TsReadonlyableBinderByNode(node),
            new TsNodedBinder(factory, node)
        );
    }

    getClassConstructorParameterScope() {
        return this.node.getClassConstructorParameterScope();
    }
}
