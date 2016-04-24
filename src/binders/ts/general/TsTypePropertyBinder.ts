import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypePropertyBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsBasePropertyBinder} from "./../base/TsBasePropertyBinder";

export class TsTypePropertyBinder extends TypePropertyBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsBasePropertyBinder(factory, node)
        );
    }
}
