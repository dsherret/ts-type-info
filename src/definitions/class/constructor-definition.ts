import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition} from "./../function";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";

export class ConstructorDefinition implements IParameteredDefinition<ClassMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillParametersBySymbol(ClassMethodParameterDefinition, typeChecker, symbol);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (
        parameterDefinition: typeof ClassMethodParameterDefinition,
        typeChecker: TypeChecker,
        symbol: ts.Symbol) => void;
    fillParametersBySignature: (
        parameterDefinition: typeof ClassMethodParameterDefinition,
        typeChecker: TypeChecker,
        signature: ts.Signature) => void;
    parameters: ClassMethodParameterDefinition[];
}

applyMixins(ConstructorDefinition, [ParameteredDefinition]);
