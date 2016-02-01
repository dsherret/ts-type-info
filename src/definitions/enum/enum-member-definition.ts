import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(typeChecker, symbol);
        this.value = typeChecker.getConstantValue(symbol);
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
