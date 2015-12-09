import * as ts from "typescript";
import {ParameterDefinition} from "./../../../definitions";
import {Type} from "./../../../types";
import {applyMixins, TypeChecker} from "./../../../utils";
import {INamedDefinition, NamedDefinition} from "./../../base/named-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./../../function/base/parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./../../function/base/return-typed-definition";

export class BaseFunctionDefinition implements INamedDefinition, IParameteredDefinition, IReturnTypedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillParametersBySymbol(typeChecker, symbol);
        this.fillReturnTypeBySymbol(typeChecker, symbol);
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ParameteredDefinition
    fillParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: ParameterDefinition[];
    // ReturnTyped
    fillReturnTypeBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnType: Type;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, ParameteredDefinition, ReturnTypedDefinition]);
