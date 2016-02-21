import {IExpression} from "./expression";
import {ITypeExpression} from "./type-expression";
import {ISignature} from "./signature";
import {ISourceFileChildBase} from "./source-file-child-base";

export interface INode extends ISourceFileChildBase {
    getConstantValue(): number;
    getDecoratorName(): string;
    getDecoratorArguments(): IExpression[];
    getSignatureFromThis(): ISignature;
    getExpression(): IExpression;
    getReturnTypeExpression(): ITypeExpression;
    hasAbstractKeyword(): boolean;
    hasDeclareKeyword(): boolean;
    hasStaticKeyword(): boolean;
    isClass(): boolean;
    isConstructor(): boolean;
    isConstructSignature(): boolean;
    isEnum(): boolean;
    isExportDeclaration(): boolean;
    isExportAssignment(): boolean;
    isFunction(): boolean;
    isFunctionType(): boolean;
    isGetAccessor(): boolean;
    isIdentifier(): boolean;
    isInterface(): boolean;
    isMethodDeclaration(): boolean;
    isMethodSignature(): boolean;
    isNamespace(): boolean;
    isPropertyDeclaration(): boolean;
    isPropertySignature(): boolean;
    isSetAccessor(): boolean;
    isTypeAlias(): boolean;
    isTypeParameter(): boolean;
    isVariable(): boolean;
    nodeKindToString(): string;
}
