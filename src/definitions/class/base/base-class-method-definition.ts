import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseFunctionDefinition, BaseParameterDefinitionConstructor} from "./../../base";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {ClassDefinition} from "./../class-definition";

export class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements IDecoratableDefinition, IScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ClassDefinition, ParameterType>, ParameterType>,
        parent: ClassDefinition,
        definitionType: DefinitionType
    ) {
        super(typeChecker, symbol, parameterDefinition, definitionType);
        this.fillDecorators(typeChecker, symbol);
        this.fillScope(symbol);
        this.parent = parent;
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
