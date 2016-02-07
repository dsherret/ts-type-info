import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {applyMixins, TypeChecker} from "./../../utils";
import {ModuledDefinitions} from "./../../definitions";
import {INamedDefinition, IParentedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition, AmbientableDefinition,
        NamedDefinition, TypeExpressionedDefinition, ExportableDefinition, DefaultExpressionedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {Expression, TypeExpression} from "./../../expressions";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {VariableDeclarationType} from "./variable-declaration-type";

export class VariableDefinition extends BaseDefinition
                                implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeExpressionedDefinition,
                                           IDefaultExpressionedDefinition, IAmbientableDefinition {
    declarationType: VariableDeclarationType;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(DefinitionType.Variable);
        this.fillName(typeChecker, symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillDeclarationType(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const variableWriter = new VariableWriter(writer, WriteFlags.Default);
        variableWriter.write(this);
        return writer.toString();
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
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);
