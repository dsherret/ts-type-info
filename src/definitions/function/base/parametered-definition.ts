import * as ts from "typescript";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {TypeChecker} from "./../../../utils";

export interface IParameteredDefinition<ParentType, ParameterType> {
    fillParametersBySymbol(paramDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillParametersBySignature(paramDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, signature: ts.Signature): void;
    parameters: ParameterType[];
}

export abstract class ParameteredDefinition<ParentType, ParameterType> implements IParameteredDefinition<ParentType, ParameterType> {
    parameters: ParameterType[];

    fillParametersBySymbol(paramDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.parameters = typeChecker.getSymbolParametersFromSymbol(symbol).map(parameterSymbol => new paramDefinition(typeChecker, parameterSymbol));
    }

    fillParametersBySignature(paramDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, signature: ts.Signature) {
        this.parameters = [];

        for (const param of signature.parameters) {
            this.parameters.push(new paramDefinition(typeChecker, param));
        }
    }
}
