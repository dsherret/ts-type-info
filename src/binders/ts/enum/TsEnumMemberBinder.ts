import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {EnumMemberBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder, TsNodedBinder} from "./../base";

export class TsEnumMemberBinder extends EnumMemberBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsNodedBinder(factory, node)
        );
    }

    getValue() {
        return this.node.getConstantValue();
    }
}
