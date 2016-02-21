import {ITypeExpression} from "./../type-expression";
import {VariableDeclarationType, Scope, ClassConstructorParameterScope, NamespaceDeclarationType} from "./../../definitions";
import {INode} from "./../node";
import {IExpression} from "./../expression";
import {ISymbolNode} from "./../symbol-node";
import {StructureNode} from "./structure-node";

export class StructureSymbolNode extends StructureNode implements ISymbolNode {
    getName() {
        return "";
    }

    isExported() {
        return false;
    }

    isDefaultExport() {
        return false;
    }

    isNamedExport() {
        return false;
    }

    isAlias() {
        return false;
    }

    isAmbient() {
        return false;
    }

    isConstructorParameter() {
        return false;
    }

    isPropertyReadonly() {
        return false;
    }

    isPropertyAccessor() {
        return false;
    }

    isParameterOptional() {
        return false;
    }

    isRestParameter() {
        return false;
    }

    isPropertyOptional() {
        return false;
    }

    getAliasSymbolNode(): ISymbolNode {
        return null;
    }

    getTypeExpression(): ITypeExpression {
        return null;
    }

    getTypeParameters(): ISymbolNode[] {
        return [];
    }

    getTypeParameterConstraintTypeExpression(): ITypeExpression {
        return null;
    }

    getVariableDeclarationType(): VariableDeclarationType {
        return VariableDeclarationType.Var;
    }

    getScope(): Scope {
        return Scope.Public;
    }

    getEnumMembers(): ISymbolNode[] {
        return [];
    }

    getAllRelatedSymbolNodes(): ISymbolNode[] {
        return [];
    }

    getDecorators(): INode[] {
        return [];
    }

    getDefaultExpression(): IExpression {
        return null;
    }

    getParameters(): ISymbolNode[] {
        return [];
    }

    getExtendsTypeExpressions(): ITypeExpression[] {
        return [];
    }

    getImplementsTypeExpressions(): ITypeExpression[] {
        return [];
    }

    getClassConstructorParameterScope(): ClassConstructorParameterScope {
        return ClassConstructorParameterScope.None;
    }

    getNamespaceDeclarationType(): NamespaceDeclarationType {
        return NamespaceDeclarationType.Namespace;
    }

    forEachChild(callback: (symbolNode: ISymbolNode) => void) {
    }
}
