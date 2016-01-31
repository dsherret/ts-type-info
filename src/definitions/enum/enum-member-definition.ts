import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition implements INamedDefinition<EnumDefinition> {
    value: number;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(typeChecker, symbol);
        this.value = typeChecker.getConstantValue(symbol);
    }

    // NamedDefinition
    name: string;
    parent: EnumDefinition;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
