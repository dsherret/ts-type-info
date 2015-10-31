import * as ts from "typescript";
import {Scope} from "./../scope";
import {DecoratorDefinition} from "./../definitions";
import {applyMixins, TypeChecker} from "./../utils";
import {Type} from "./../types";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";
import {ITypedDefinition, TypedDefinition} from "./base/typed-definition";

export class PropertyDefinition implements ITypedDefinition, INamedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillType(typeChecker, symbol);
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