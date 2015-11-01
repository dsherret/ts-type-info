import * as ts from "typescript";
import {Serializable} from "./../../utils";
import {ParameterDefinition} from "./../../definitions";
import {TypeChecker} from "./../../utils";

export interface IParameteredDefinition {
    fillParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
    parameters: ParameterDefinition[];
}

export abstract class ParameteredDefinition implements IParameteredDefinition {
    private _parameters: ParameterDefinition[] = [];

    fillParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._parameters = [];

        for (var param of this.getDeclaration(symbol).parameters) {
            let parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new ParameterDefinition(typeChecker, parameterSymbol));
        }
    }

    fillParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this._parameters = [];

        for (var param of signature.parameters) {
            this._parameters.push(new ParameterDefinition(typeChecker, param));
        }
    }

    @Serializable
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
            throw "Could not get declaration when getting parameters.";
        }
    }
}
