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
    name: string;
    fillName: (symbol: ts.Symbol) => void;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
