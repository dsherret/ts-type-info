import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ObjectPropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./TsBasePropertyBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";

export class TsObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(
            new TsBasePropertyBinder(mainFactory, node),
            new TsDefaultExpressionedBinder(node)
        );
    }
}
