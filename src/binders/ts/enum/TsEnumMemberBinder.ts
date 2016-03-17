import {TsNode} from "./../../../compiler"
import {EnumMemberBinder} from "./../../base";
import {TsNamedBinder} from "./../base";

export class TsEnumMemberBinder extends EnumMemberBinder {
    constructor(private node: TsNode) {
        super(new TsNamedBinder(node));
    }

    getValue() {
        return this.node.getConstantValue();
    }
}
