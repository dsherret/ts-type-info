import {ITypeExpression} from "./../type-expression";
import {VariableDeclarationType, Scope, ClassConstructorParameterScope, NamespaceDeclarationType} from "./../../definitions";
import {ClassPropertyStructure, BasePropertyStructure, ScopedStructure, DefaultExpressionedStructure, TypeExpressionedStructure} from "./../../structures";
import {INode} from "./../node";
import {IExpression} from "./../expression";
import {ISymbolNode} from "./../symbol-node";
import {StructureNode} from "./structure-node";
import {StructureExpression} from "./structure-expression";
import {StructureTypeExpression} from "./structure-type-expression";

export class StructureSymbolNode extends StructureNode implements ISymbolNode {
    getName() {
        return this.structure.name || "";
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
        return (this.structure as ClassPropertyStructure).isConstructorParameter || false;
    }

    isPropertyReadonly() {
        return false;
    }

    isPropertyAccessor() {
        return false;
    }

    isParameterOptional() {
        return (this.structure as BasePropertyStructure).isOptional;
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
        const typeExpression = (this.structure as TypeExpressionedStructure).type;
        return typeExpression == null ? null : new StructureTypeExpression(typeExpression);
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
        return (this.structure as ScopedStructure).scope || Scope.Public;
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
        const defaultExpression = (this.structure as DefaultExpressionedStructure).defaultExpression;
        return defaultExpression == null ? null : new StructureExpression(defaultExpression);
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
        throw new Error("Not implemented");
    }
}
