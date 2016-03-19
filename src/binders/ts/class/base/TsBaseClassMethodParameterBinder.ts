import {TsFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassMethodParameterBinder} from "./../../../base";
import {TsDecoratableBinder, TsBaseParameterBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassMethodParameterBinder extends BaseClassMethodParameterBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(
            new TsBaseParameterBinder(tsFactory, node),
            new TsDecoratableBinder(node),
            new TsScopedBinder(node)
        );
    }
}
