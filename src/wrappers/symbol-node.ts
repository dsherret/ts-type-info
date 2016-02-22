import {ITypeExpression} from "./type-expression";
import {VariableDeclarationType, Scope, ClassConstructorParameterScope, NamespaceDeclarationType} from "./../definitions";
import {INode} from "./node";
import {IExpression} from "./expression";

export interface ISymbolNode extends INode {
    getAliasSymbolNode(): ISymbolNode;
    getAllRelatedSymbolNodes(): ISymbolNode[];
    getClassConstructorParameterScope(): ClassConstructorParameterScope;
    getDecorators(): INode[];
    getDefaultExpression(): IExpression;
    getExtendsTypeExpressions(): ITypeExpression[];
    getEnumMembers(): ISymbolNode[];
    getImplementsTypeExpressions(): ITypeExpression[];
    getName(): string;
    getNamespaceDeclarationType(): NamespaceDeclarationType;
    getParameters(): ISymbolNode[];
    getScope(): Scope;
    getTypeExpression(): ITypeExpression;
    getTypeParameters(): ISymbolNode[];
    getTypeParameterConstraintTypeExpression(): ITypeExpression;
    getVariableDeclarationType(): VariableDeclarationType;
    forEachChild(callback: (symbolNode: ISymbolNode) => void): void;
    isAlias(): boolean;
    isAmbient(): boolean;
    isConstructorParameter(): boolean;
    isDefaultExport(): boolean;
    isExported(): boolean;
    isNamedExport(): boolean;
    isParameterOptional(): boolean;
    isPropertyAccessor(): boolean;
    isPropertyOptional(): boolean;
    isPropertyReadonly(): boolean;
    isRestParameter(): boolean;
}
