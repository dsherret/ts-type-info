import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {EnumBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder, TsExportableBinder, TsAmbientableBinder} from "./../base";

export class TsEnumBinder extends EnumBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node)
        );
    }

    getIsConst() {
        return this.node.hasConstKeyword();
    }

    getMembers() {
        return this.node.getSymbol()!.getExportSymbols().map(memberSymbol => {
            const memberNode = memberSymbol.getOnlyNode();
            return this.factory.getEnumMember(memberNode);
        });
    }
}
