import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseObjectPropertyBinder} from "./../../base";
import {TsBasePropertyBinderByNode} from "./TsBasePropertyBinderByNode";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";

export class TsBaseObjectPropertyBinder extends BaseObjectPropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBasePropertyBinderByNode(factory, node),
            new TsDefaultExpressionedBinder(factory, node)
        );
    }
}
