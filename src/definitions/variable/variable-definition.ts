import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition, AmbientableDefinition,
        NamedDefinition, TypeExpressionedDefinition, ExportableDefinition, DefaultExpressionedDefinition} from "./../base";
import {Expression, TypeExpression} from "./../../expressions";
import {VariableDeclarationType} from "./variable-declaration-type";

export class VariableDefinition implements INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition {
    declarationType: VariableDeclarationType;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillDeclarationType(typeChecker, symbol);
    }

    private fillDeclarationType(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).parent.flags;

        if (nodeFlags & ts.NodeFlags.Let) {
            this.declarationType = VariableDeclarationType.Let;
        }
        else if (nodeFlags & ts.NodeFlags.Const) {
            this.declarationType = VariableDeclarationType.Const;
        }
        else {
            this.declarationType = VariableDeclarationType.Var;
        }
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ExportableDefinition
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    // TypeExpressionedDefinition
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    typeExpression: TypeExpression;
    hasExportKeyword: boolean;
    // DefaultExpressionedDefinition
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    defaultExpression: Expression;
    // AmbientableDefinition
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);
