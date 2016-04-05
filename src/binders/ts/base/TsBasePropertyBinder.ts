import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeExpressionedBinder} from "./TsTypeExpressionedBinder";

export class TsBasePropertyBinder extends BasePropertyBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsTypeExpressionedBinder(factory, node)
        );
    }

    getIsOptional() {
        return this.node.isPropertyOptional();
    }
}
