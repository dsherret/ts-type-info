import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeExpressionedBinder} from "./TsTypeExpressionedBinder";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";

export class TsBasePropertyBinder extends BasePropertyBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsTypeExpressionedBinder(factory, node)
        );
    }

    getIsOptional() {
        return this.node.isPropertyOptional();
    }
}
