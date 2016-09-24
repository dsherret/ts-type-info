import {TsTypeNode} from "./../../../../compiler";
import {TsFactory} from "./../../../../factories";
import {BaseTypeBinder} from "./../../../base";
import {TsExpressionBinder} from "./../TsExpressionBinder";

export class TsBaseTypeBinderByTypeNode extends BaseTypeBinder {
    constructor(private readonly factory: TsFactory, private readonly tsTypeNode: TsTypeNode) {
        super(new TsExpressionBinder(tsTypeNode));
    }

    isArrayType() {
        return this.tsTypeNode.isArrayTypeNode();
    }

    getArrayElementType() {
        const tsNode = this.tsTypeNode.getArrayElementTypeNode();
        return tsNode == null ? null : this.factory.getTypeFromTypeNode(tsNode);
    }

    isIntersectionType() {
        return this.tsTypeNode.isIntersectionType();
    }

    isUnionType() {
        return this.tsTypeNode.isUnionType();
    }

    getUnionOrIntersectionTypes() {
        return this.tsTypeNode.getUnionOrIntersectionTypeNodes().map(t => this.factory.getTypeFromTypeNode(t));
    }

    getProperties() {
        return this.tsTypeNode.getMemberNodes().map(p => this.factory.getTypePropertyFromNode(p));
    }

    getTypeArguments() {
        return this.tsTypeNode.getTypeArgumentsTypeNodes().map(arg => this.factory.getTypeFromTypeNode(arg));
    }
}
