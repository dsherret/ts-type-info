import * as ts from "typescript";
import {DecoratorDefinition} from "./../../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../../base";
import {applyMixins, TypeChecker} from "./../../../utils";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType, definitionType: DefinitionType) {
        super(typeChecker, symbol, parent, definitionType);
        this.fillDecorators(typeChecker, symbol);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(BaseClassMethodParameterDefinition, [DecoratableDefinition]);
