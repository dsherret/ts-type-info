import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {Type} from "./../../types";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {ITypedDefinition, TypedDefinition} from "./typed-definition";

export class PropertyDefinition implements ITypedDefinition, INamedDefinition {
    private _isOptional: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillType(typeChecker, symbol);

        this._isOptional = typeChecker.isOptionalProperty(symbol);
    }

    get isOptional() {
        return this._isOptional;
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // TypedDefinition
    fillType: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    type: Type;

    static isProperty(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0;
    }
}

applyMixins(PropertyDefinition, [NamedDefinition, TypedDefinition]);
