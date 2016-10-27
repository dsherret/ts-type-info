import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {EnumBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinderByNode, TsExportableBinder, TsAmbientableBinder, TsNodedBinder, TsDocumentationedBinder} from "./../base";

export class TsEnumBinder extends EnumBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsNodedBinder(factory, node),
            new TsDocumentationedBinder(node)
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
