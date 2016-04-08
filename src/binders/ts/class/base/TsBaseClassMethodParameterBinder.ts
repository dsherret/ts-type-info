import {TsFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassMethodParameterBinder} from "./../../../base";
import {TsDecoratableBinder, TsBaseParameterBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassMethodParameterBinder extends BaseClassMethodParameterBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseParameterBinder(factory, node),
            new TsDecoratableBinder(factory, node),
            new TsScopedBinder(node)
        );
    }
}
