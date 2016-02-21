import {ITypeExpression} from "./type-expression";
import {VariableDeclarationType, Scope, ClassConstructorParameterScope, NamespaceDeclarationType} from "./../definitions";
import {INode} from "./node";
import {IExpression} from "./expression";

export interface ISymbolNode extends INode {
    getName(): string;
    isExported(): boolean;
    isDefaultExport(): boolean;
    isNamedExport(): boolean;
    isAlias(): boolean;
    isAmbient(): boolean;
    isConstructorParameter(): boolean;
    isPropertyReadonly(): boolean;
    isPropertyAccessor(): boolean;
    isParameterOptional(): boolean;
    isRestParameter(): boolean;
    isPropertyOptional(): boolean;
    getAliasSymbolNode(): ISymbolNode;
    getTypeExpression(): ITypeExpression;
    getTypeParameters(): ISymbolNode[];
    getTypeParameterConstraintTypeExpression(): ITypeExpression;
    getVariableDeclarationType(): VariableDeclarationType;
    getScope(): Scope;
    getEnumMembers(): ISymbolNode[];
    getAllRelatedSymbolNodes(): ISymbolNode[];
    getDecorators(): INode[];
    getDefaultExpression(): IExpression;
    getParameters(): ISymbolNode[];
    getExtendsTypeExpressions(): ITypeExpression[];
    getImplementsTypeExpressions(): ITypeExpression[];
    getClassConstructorParameterScope(): ClassConstructorParameterScope;
    getNamespaceDeclarationType(): NamespaceDeclarationType;
    forEachChild(callback: (symbolNode: ISymbolNode) => void): void;
}
