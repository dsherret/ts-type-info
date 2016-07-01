import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsOptionalBinderForProperty} from "./TsOptionalBinderForProperty";
import {TsTypedBinder} from "./TsTypedBinder";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";

export class TsBasePropertyBinder extends BasePropertyBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsOptionalBinderForProperty(node),
            new TsTypedBinder(factory, node)
        );
    }
}
