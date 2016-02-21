import {INode} from "./../node";
import {IExpression} from "./../expression";
import {ITypeExpression} from "./../type-expression";
import {ISignature} from "./../signature";
import {ISourceFileChildBase} from "./../source-file-child-base";
import {StructureExpression} from "./structure-expression";
import {StructureSignature} from "./structure-signature";
import {StructureTypeExpression} from "./structure-type-expression";
import {StructureSourceFileChildBase} from "./structure-source-file-child-base";

export class StructureNode extends StructureSourceFileChildBase implements INode {
    getConstantValue() {
        return 0;
    }

    getDecoratorName() {
        return "";
    }

    getDecoratorArguments(): IExpression[] {
        return [];
    }

    getSignatureFromThis(): ISignature {
        return null;
    }

    getExpression(): IExpression {
        return null;
    }

    getReturnTypeExpression(): ITypeExpression {
        return null;
    }

    hasAbstractKeyword() {
        return false;
    }

    hasDeclareKeyword() {
        return false;
    }

    hasStaticKeyword() {
        return false;
    }

    isClass() {
        return false;
    }

    isConstructor() {
        return false;
    }

    isConstructSignature() {
        return false;
    }

    isEnum() {
        return false;
    }

    isExportDeclaration() {
        return false;
    }

    isExportAssignment() {
        return false;
    }

    isFunction() {
        return false;
    }

    isFunctionType() {
        return false;
    }

    isGetAccessor() {
        return false;
    }

    isIdentifier() {
        return false;
    }

    isInterface() {
        return false;
    }

    isMethodDeclaration() {
        return false;
    }

    isMethodSignature() {
        return false;
    }

    isNamespace() {
        return false;
    }

    isPropertyDeclaration() {
        return false;
    }

    isPropertySignature() {
        return false;
    }

    isSetAccessor() {
        return false;
    }

    isTypeAlias() {
        return false;
    }

    isTypeParameter() {
        return false;
    }

    isVariable() {
        return false;
    }

    nodeKindToString() {
        return "";
    }
}
