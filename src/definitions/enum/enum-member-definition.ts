import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition} from "./../base";

export class EnumMemberDefinition implements INamedDefinition {
    private _value: number;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this._value = typeChecker.getConstantValue(symbol);
    }

    get value() {
        return this._value;
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;

    static isEnumMemberDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.EnumMember) !== 0;
    }
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
