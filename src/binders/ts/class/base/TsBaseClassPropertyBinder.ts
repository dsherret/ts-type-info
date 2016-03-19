import {TsFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassPropertyBinder} from "./../../../base";
import {TsDecoratableBinder, TsObjectPropertyBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassPropertyBinder extends BaseClassPropertyBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(
            new TsObjectPropertyBinder(tsFactory, node),
            new TsDecoratableBinder(node),
            new TsScopedBinder(node)
        );
    }
}
