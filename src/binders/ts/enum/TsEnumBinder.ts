﻿import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {EnumBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsNodedBinder} from "./../base";

export class TsEnumBinder extends EnumBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsNodedBinder(factory, node)
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
