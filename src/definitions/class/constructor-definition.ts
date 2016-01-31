import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition} from "./../function";
import {ConstructorParameterDefinition} from "./constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ConstructorDefinition implements IParameteredDefinition<ClassDefinition, ConstructorParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillParametersBySymbol(ConstructorParameterDefinition, typeChecker, symbol);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (
        parameterDefinition: typeof ConstructorParameterDefinition,
        typeChecker: TypeChecker,
        symbol: ts.Symbol) => void;
    fillParametersBySignature: (
        parameterDefinition: typeof ConstructorParameterDefinition,
        typeChecker: TypeChecker,
        signature: ts.Signature) => void;
    parameters: ConstructorParameterDefinition[];
}

applyMixins(ConstructorDefinition, [ParameteredDefinition]);
