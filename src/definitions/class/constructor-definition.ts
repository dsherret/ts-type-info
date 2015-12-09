import * as ts from "typescript";
import {ParameterDefinition} from "./../../definitions";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition} from "./../function/base/parametered-definition";

export class ConstructorDefinition implements IParameteredDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillParametersBySymbol(typeChecker, symbol);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: ParameterDefinition[];

    static isConstructor(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Constructor) !== 0;
    }
}

applyMixins(ConstructorDefinition, [ParameteredDefinition]);
