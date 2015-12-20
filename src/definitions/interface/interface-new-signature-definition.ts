import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition, ParameterDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../function";
import {Type} from "./../../types";

export class InterfaceNewSignatureDefinition implements IParameteredDefinition<ParameterDefinition>, IReturnTypedDefinition {
    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillParametersBySignature(ParameterDefinition, typeChecker, signature);
        this.fillReturnTypeBySignature(typeChecker, signature);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (
        parameterDefinition: typeof ParameterDefinition,
        typeChecker: TypeChecker,
        symbol: ts.Symbol) => void;
    fillParametersBySignature: (
        parameterDefinition: typeof ParameterDefinition,
        typeChecker: TypeChecker,
        signature: ts.Signature) => void;
    parameters: ParameterDefinition[];
    // ReturnTyped
    fillReturnTypeBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnType: Type;

    static isNewSignature(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Signature) !== 0;
    }
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
