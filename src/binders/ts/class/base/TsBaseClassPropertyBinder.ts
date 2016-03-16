import {BaseClassMethodParameterDefinition} from "./../../../../definitions";
import {MainFactory} from "./../../../../factories";
import {TsNode} from "./../../../../wrappers";
import {BaseClassPropertyBinder} from "./../../../base";
import {TsDecoratableBinder, TsObjectPropertyBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassPropertyBinder extends BaseClassPropertyBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(
            new TsObjectPropertyBinder(mainFactory, node),
            new TsDecoratableBinder(node),
            new TsScopedBinder(node)
        );
    }
}
