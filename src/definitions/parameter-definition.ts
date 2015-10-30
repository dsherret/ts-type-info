import * as ts from "typescript";
import {DecoratorDefinition} from "./../definitions";
import {applyMixins, TypeChecker} from "./../utils";
import {Type} from "./../types";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";
import {IDecoratableDefinition, DecoratableDefinition} from "./base/decorated-definition";
import {ITypedDefinition, TypedDefinition} from "./base/typed-definition";

// todo: add isOptional parameter
// todo: check decorators work
// todo: public/private/protected for constructors?

export class ParameterDefinition implements ITypedDefinition, INamedDefinition, IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillType(typeChecker, symbol);
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

applyMixins(ParameterDefinition, [NamedDefinition, DecoratableDefinition, TypedDefinition]);
