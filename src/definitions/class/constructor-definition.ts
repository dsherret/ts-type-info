import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition} from "./../function";
import {ConstructorParameterDefinition} from "./constructor-parameter-definition";

export class ConstructorDefinition implements IParameteredDefinition<ConstructorParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillParametersBySymbol(typeChecker, symbol, this, ConstructorParameterDefinition);
    }

    // ParameteredDefinition
    parameters: ConstructorParameterDefinition[];
    fillParametersBySymbol: (
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parent: this,
        parameterDefinition: typeof ConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        typeChecker: TypeChecker,
        signature: ts.Signature,
        parent: this,
        parameterDefinition: typeof ConstructorParameterDefinition) => void;
}

applyMixins(ConstructorDefinition, [ParameteredDefinition]);
