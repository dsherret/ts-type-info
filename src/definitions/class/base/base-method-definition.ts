import * as ts from "typescript";
import {DecoratorDefinition, ParameterDefinition} from "./../../../definitions";
import {Scope} from "./../../../scope";
import {Type} from "./../../../types";
import {applyMixins, TypeChecker} from "./../../../utils";
import {IDecoratedDefinition, DecoratedDefinition} from "./../../base/decorated-definition";
import {INamedDefinition, NamedDefinition} from "./../../base/named-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./../../function/base/parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./../../function/base/return-typed-definition";
import {IScopedDefinition, ScopedDefinition} from "./../../base/scoped-definition";

export class BaseMethodDefinition implements INamedDefinition, IDecoratedDefinition, IParameteredDefinition,
    IReturnTypedDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
        this.fillParametersBySymbol(typeChecker, symbol);
        this.fillReturnTypeBySymbol(typeChecker, symbol);
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // DecoratableDefinition
    fillDecorators: (symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // ParameteredDefinition
    fillParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: ParameterDefinition[];
    // ReturnTyped
    fillReturnTypeBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnType: Type;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseMethodDefinition, [NamedDefinition, DecoratedDefinition, ParameteredDefinition, ReturnTypedDefinition, ScopedDefinition]);
