import {TsTypeNode, TsType} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {TsExpressionBinder} from "./TsExpressionBinder";

// todo: try to remove TsType from here

export class TsTypeBinderByTypeNode extends TypeBinder {
    private readonly getCallSignatureAndProperties: boolean;
    private readonly tsType: TsType;

    constructor(private readonly factory: TsFactory, private readonly tsTypeNode: TsTypeNode) {
        super(new TsExpressionBinder(tsTypeNode));

        this.tsType = tsTypeNode.getType();

        this.getCallSignatureAndProperties = this.tsType.isAnonymousType() && !this.tsType.isReferenceType() &&
            !this.tsType.isClassType() && !this.tsType.isInterfaceType() && !this.tsType.isUnionType() && !this.tsType.isIntersectionType() &&
            !this.tsType.isTupleType();
    }

    isArrayType() {
        return this.tsTypeNode.isArrayTypeNode();
    }

    isIntersectionType() {
        return this.tsType.isIntersectionType();
    }

    isUnionType() {
        return this.tsType.isUnionType();
    }

    getArrayElementType() {
        const tsNode = this.tsTypeNode.getArrayElementTypeNode();
        return tsNode == null ? null : this.factory.getTypeFromTypeNode(tsNode);
    }

    getUnionOrIntersectionTypes() {
        return this.tsTypeNode.getUnionOrIntersectionTypeNodes().map(t => this.factory.getTypeFromTypeNode(t));
    }

    getCallSignatures() {
        if (this.getCallSignatureAndProperties) {
            return this.tsType.getCallSignatures().map(c => this.factory.getCallSignatureFromSignature(c));
        }
        else {
            return [];
        }
    }

    getProperties() {
        if (this.getCallSignatureAndProperties) {
            return this.tsTypeNode.getMemberNodes().map(p => this.factory.getTypePropertyFromNode(p));
        }
        else {
            return [];
        }
    }

    getTypeArguments() {
        return this.tsTypeNode.getTypeArgumentsTypeNodes().map(arg => this.factory.getTypeFromTypeNode(arg));
    }
}
