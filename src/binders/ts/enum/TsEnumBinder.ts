import {EnumMemberDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler"
import {EnumBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder} from "./../base";
import {TsEnumMemberBinder} from "./TsEnumMemberBinder";

export class TsEnumBinder extends EnumBinder {
    constructor(private node: TsNode) {
        super(new TsNamedBinder(node), new TsExportableBinder(node), new TsAmbientableBinder(node));
    }

    getMembers() {
        return this.node.getSymbol().getExportSymbols().map(memberSymbol => {
            const memberNode = memberSymbol.getOnlyNode();
            const def = new EnumMemberDefinition();
            const binder = new TsEnumMemberBinder(memberNode);

            binder.bind(def);

            return def;
        });
    }
}
