import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ObjectPropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./TsBasePropertyBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";

export class TsObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBasePropertyBinder(factory, node),
            new TsDefaultExpressionedBinder(factory, node)
        );
    }
}
