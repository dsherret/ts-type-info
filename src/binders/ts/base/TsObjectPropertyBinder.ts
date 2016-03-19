import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ObjectPropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./TsBasePropertyBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";

export class TsObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(
            new TsBasePropertyBinder(tsFactory, node),
            new TsDefaultExpressionedBinder(node)
        );
    }
}
