import * as ts from "typescript";
import {NamedDefinition, ParameterDefinition} from "./../definitions";
import {TypeChecker, Serializable} from "./../utils";

export class MethodDefinition extends NamedDefinition {
    private _parameters: ParameterDefinition[] = []; 

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(symbol);

        for (var param of (symbol.valueDeclaration as ts.SignatureDeclaration).parameters) {
            let parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new ParameterDefinition(typeChecker, parameterSymbol));
        }
    }

    @Serializable
    get parameters() {
        return this._parameters;
    }

    static isClassMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) != 0;
    }
}
