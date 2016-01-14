import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition} from "./../base";

export class EnumMemberDefinition implements INamedDefinition {
    value: number;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.value = typeChecker.getConstantValue(symbol);
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;

    static isEnumMemberDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.EnumMember) !== 0;
    }
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
