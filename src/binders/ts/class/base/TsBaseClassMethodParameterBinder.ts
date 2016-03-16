import {BaseClassMethodParameterDefinition} from "./../../../../definitions";
import {MainFactory} from "./../../../../factories";
import {TsNode} from "./../../../../wrappers";
import {BaseClassMethodParameterBinder} from "./../../../base";
import {TsDecoratableBinder, TsBaseParameterBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassMethodParameterBinder extends BaseClassMethodParameterBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(
            new TsBaseParameterBinder(mainFactory, node),
            new TsDecoratableBinder(node),
            new TsScopedBinder(node)
        );
    }
}
