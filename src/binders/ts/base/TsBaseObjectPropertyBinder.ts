import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseObjectPropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./TsBasePropertyBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";

export class TsBaseObjectPropertyBinder extends BaseObjectPropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBasePropertyBinder(factory, node),
            new TsDefaultExpressionedBinder(factory, node)
        );
    }
}
