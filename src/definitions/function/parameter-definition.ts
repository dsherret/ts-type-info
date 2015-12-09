import * as ts from "typescript";
import {DecoratorDefinition} from "./../../definitions";
import {applyMixins, TypeChecker} from "./../../utils";
import {Type} from "./../../types";
import {INamedDefinition, NamedDefinition} from "./../base/named-definition";
import {IDecoratedDefinition, DecoratedDefinition} from "./../base/decorated-definition";
import {ITypedDefinition, TypedDefinition} from "./../base/typed-definition";

// todo: check decorators work

export class ParameterDefinition implements ITypedDefinition, INamedDefinition, IDecoratedDefinition {
    private _isRequired: boolean;
    private _isRestParameter: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
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
    // DecoratableDefinition
    fillDecorators: (symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // TypedDefinition
    fillType: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    type: Type;
}

applyMixins(ParameterDefinition, [NamedDefinition, DecoratedDefinition, TypedDefinition]);
