import * as ts from "typescript";
import {ParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {TypeChecker} from "./../../../utils";

export interface IParameteredDefinition<T extends ParameterDefinition> {
    fillParametersBySymbol(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillParametersBySignature(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, signature: ts.Signature): void;
    parameters: T[];
}

export abstract class ParameteredDefinition<T extends ParameterDefinition> implements IParameteredDefinition<T> {
    private _parameters: T[] = [];

    fillParametersBySymbol(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._parameters = [];

        for (const param of this.getDeclaration(symbol).parameters.filter(p => p != null)) {
            let parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new paramDefinition(typeChecker, parameterSymbol));
        }
    }

    fillParametersBySignature(paramDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, signature: ts.Signature) {
        this._parameters = [];

        for (const param of signature.parameters) {
            this._parameters.push(new paramDefinition(typeChecker, param));
        }
    }

    get parameters() {
        return this._parameters;
    }

    private getDeclaration(symbol: ts.Symbol) {
        if (symbol.valueDeclaration != null) {
            // methods
            return symbol.valueDeclaration as ts.SignatureDeclaration;
        }
        else if (symbol.getDeclarations().length === 1) {
            // constructors
            return symbol.getDeclarations()[0] as ts.SignatureDeclaration;
        }
        else {
            console.warn("Could not get declaration when getting parameters.");
            return null;
        }
    }
}
