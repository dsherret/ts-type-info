import * as ts from "typescript";
import {ParameterDefinition} from "./../parameter-definition";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {TypeChecker} from "./../../../utils";

export interface IParameteredDefinition<T extends ParameterDefinition> {
    fillParametersBySymbol(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillParametersBySignature(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, signature: ts.Signature): void;
    parameters: T[];
}

export abstract class ParameteredDefinition<T extends ParameterDefinition> implements IParameteredDefinition<T> {
    parameters: T[] = [];

    fillParametersBySymbol(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.parameters = typeChecker.getSymbolParametersFromSymbol(symbol).map(parameterSymbol => new paramDefinition(typeChecker, parameterSymbol));
    }

    fillParametersBySignature(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, signature: ts.Signature) {
        this.parameters = [];

        for (const param of signature.parameters) {
            this.parameters.push(new paramDefinition(typeChecker, param));
        }
    }
}
