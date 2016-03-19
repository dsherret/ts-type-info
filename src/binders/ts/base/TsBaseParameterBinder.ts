import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseParameterBinder} from "./../../base";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeExpressionedBinder} from "./TsTypeExpressionedBinder";

export class TsBaseParameterBinder extends BaseParameterBinder {
    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsTypeExpressionedBinder(tsFactory, node),
            new TsDefaultExpressionedBinder(node)
        );
    }

    getIsOptional() {
        return this.node.isParameterOptional();
    }

    getIsRestParameter() {
        return this.node.isRestParameter();
    }
}
