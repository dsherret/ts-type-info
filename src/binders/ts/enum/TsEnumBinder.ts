import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {EnumBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder} from "./../base";

export class TsEnumBinder extends EnumBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(new TsNamedBinder(node), new TsExportableBinder(node), new TsAmbientableBinder(node));
    }

    getMembers() {
        return this.node.getSymbol().getExportSymbols().map(memberSymbol => {
            const memberNode = memberSymbol.getOnlyNode();
            return this.factory.getEnumMember(memberNode);
        });
    }
}
