import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypedBinder} from "./TsTypedBinder";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";

export class TsBasePropertyBinder extends BasePropertyBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsTypedBinder(factory, node)
        );
    }

    getIsOptional() {
        return this.node.isPropertyOptional();
    }
}
