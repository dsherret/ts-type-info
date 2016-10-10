import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {EnumMemberBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinderByNode, TsNodedBinder} from "./../base";

export class TsEnumMemberBinder extends EnumMemberBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsNodedBinder(factory, node)
        );
    }

    getValue() {
        return this.node.getConstantValue();
    }
}
