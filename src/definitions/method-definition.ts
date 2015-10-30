import * as ts from "typescript";
import {ParameterDefinition, DecoratorDefinition} from "./../definitions";
import {Scope} from "./../scope";
import {Type} from "./../types";
import {applyMixins, TypeChecker, Serializable} from "./../utils";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";
import {IDecoratableDefinition, DecoratableDefinition} from "./base/decorated-definition";
import {IScopeDefinition, ScopeDefinition} from "./base/scoped-definition";

export class MethodDefinition implements INamedDefinition, IDecoratableDefinition, IScopeDefinition {
    private _parameters: ParameterDefinition[] = [];
    private _returnType: Type;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);

        this.fillReturnType(typeChecker, symbol);
        this.fillParameters(typeChecker, symbol);
    }

    @Serializable
    get parameters() {
        return this._parameters;
    }

    @Serializable
    get returnType() {
        return this._returnType;
    }

    private fillReturnType(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
    }

    private fillParameters(typeChecker: TypeChecker, symbol: ts.Symbol) {
        for (var param of (symbol.valueDeclaration as ts.SignatureDeclaration).parameters) {
            let parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new ParameterDefinition(typeChecker, parameterSymbol));
        }
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // DecoratableDefinition
    fillDecorators: (symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;

    static isClassMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}

applyMixins(MethodDefinition, [NamedDefinition, ScopeDefinition, DecoratableDefinition]);
