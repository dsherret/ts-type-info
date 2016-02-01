import * as ts from "typescript";
import {TypeChecker, applyMixins} from "./../../utils";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {IDefaultExpressionedDefinition} from "./../base";
import {DefaultExpressionedDefinition} from "./../base/default-expressioned-definition";
import {BasePropertyDefinition} from "./../base/base-property-definition";
import {Expression} from "./../../expressions";

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType) {
        super(typeChecker, symbol, parent);

        this.fillDefaultExpression(typeChecker, symbol);
    }

    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(ObjectPropertyDefinition, [DefaultExpressionedDefinition]);
