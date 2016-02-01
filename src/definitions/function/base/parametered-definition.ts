import * as ts from "typescript";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {TypeChecker} from "./../../../utils";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol, parent: this, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    fillParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature, parent: this, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    parameters: ParameterType[];
}

export abstract class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
    parameters: ParameterType[];

    fillParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol, parent: this, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = typeChecker.getSymbolParametersFromSymbol(symbol).map(parameterSymbol => new paramDefinition(typeChecker, parameterSymbol, this));
    }

    fillParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature, parent: this, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = [];

        for (const param of signature.parameters) {
            this.parameters.push(new paramDefinition(typeChecker, param, this));
        }
    }
}
