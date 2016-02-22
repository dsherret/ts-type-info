import {IExpression} from "./expression";
import {ITypeExpression} from "./type-expression";
import {ISignature} from "./signature";
import {ISourceFileChild} from "./source-file-child";

export interface INode extends ISourceFileChild {
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
