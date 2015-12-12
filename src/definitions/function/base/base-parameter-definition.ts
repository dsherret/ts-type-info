import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../../utils";
import {Type} from "./../../../types";
import {INamedDefinition, NamedDefinition, ITypedDefinition, TypedDefinition} from "./../../base";

export interface BaseParameterDefinitionConstructor<T extends BaseParameterDefinition> {
    new(typeChecker: TypeChecker, symbol: ts.Symbol): T;
}

export class BaseParameterDefinition implements ITypedDefinition, INamedDefinition {
    private _isRequired: boolean;
    private _isRestParameter: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillType(typeChecker, symbol);
        this.fillParameterDetails(symbol);
    }

    get isRequired() {
        return this._isRequired;
    }

    get isRestParameter() {
        return this._isRestParameter;
    }

    private fillParameterDetails(symbol: ts.Symbol) {
        let declaration = symbol.valueDeclaration as ts.ParameterDeclaration;

        this._isRequired = declaration.questionToken == null && declaration.initializer == null && declaration.dotDotDotToken == null;
        this._isRestParameter = declaration.dotDotDotToken != null;
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // TypedDefinition
    fillType: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    type: Type;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypedDefinition]);
