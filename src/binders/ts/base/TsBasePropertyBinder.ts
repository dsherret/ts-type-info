import {BasePropertyDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler"
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeExpressionedBinder} from "./TsTypeExpressionedBinder";

export class TsBasePropertyBinder extends BasePropertyBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsTypeExpressionedBinder(mainFactory, node)
        );
    }

    getIsOptional() {
        return this.node.isPropertyOptional();
    }
}
