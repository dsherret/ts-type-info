import * as ts from "typescript";
import {ParameterDefinition} from "./../definitions";
import {Scope} from "./../scope";
import {Type} from "./../types";
import {applyMixins, TypeChecker} from "./../utils";
import {IParameteredDefinition, ParameteredDefinition} from "./base/parametered-definition";

export class ConstructorDefinition implements IParameteredDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillParameters(typeChecker, symbol);
    }

    // ParameteredDefinition
    fillParameters: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    parameters: ParameterDefinition[];

    static isConstructor(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Constructor) != 0
    }
}

applyMixins(ConstructorDefinition, [ParameteredDefinition]);
