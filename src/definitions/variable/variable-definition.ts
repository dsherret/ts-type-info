import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition,
        NamedDefinition, TypeExpressionedDefinition, ExportableDefinition, DefaultExpressionedDefinition} from "./../base";
import {Expression, TypeExpression} from "./../../expressions";
import {VariableDeclarationType} from "./variable-declaration-type";

export class VariableDefinition implements INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    declarationType: VariableDeclarationType;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
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
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    // TypeExpressionedDefinition
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    typeExpression: TypeExpression;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
