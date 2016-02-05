import * as ts from "typescript";
import {TypeChecker, applyMixins} from "./../../utils";
import {DefinitionType} from "./definition-type";
import {DefaultExpressionedDefinition, IDefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BasePropertyDefinition} from "./base-property-definition";
import {Expression} from "./../../expressions";

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType, definitionType: DefinitionType) {
        super(typeChecker, symbol, parent, definitionType);

        this.fillDefaultExpression(typeChecker, symbol);
    }

    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(ObjectPropertyDefinition, [DefaultExpressionedDefinition]);
