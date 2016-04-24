import {TsNode} from "./../../../compiler";
import {EnumMemberBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder} from "./../base";

export class TsEnumMemberBinder extends EnumMemberBinder {
    constructor(private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node)
        );
    }

    getValue() {
        return this.node.getConstantValue();
    }
}
