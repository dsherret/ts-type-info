import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseParameterBinder} from "./../../base";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeExpressionedBinder} from "./TsTypeExpressionedBinder";

export class TsBaseParameterBinder extends BaseParameterBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsTypeExpressionedBinder(factory, node),
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
