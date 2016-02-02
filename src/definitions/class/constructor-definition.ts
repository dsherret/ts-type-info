import * as ts from "typescript";
import {IParentedDefinition} from "./../base";
import {IParameteredDefinition, ParameteredDefinition} from "./../function";
import {ConstructorParameterDefinition} from "./constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";
import {applyMixins, TypeChecker} from "./../../utils";

export class ConstructorDefinition implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ConstructorParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        this.fillParametersBySymbol(typeChecker, symbol, ConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ConstructorParameterDefinition[];
    fillParametersBySymbol: (
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: typeof ConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        typeChecker: TypeChecker,
        signature: ts.Signature,
        parameterDefinition: typeof ConstructorParameterDefinition) => void;
}

applyMixins(ConstructorDefinition, [ParameteredDefinition]);
