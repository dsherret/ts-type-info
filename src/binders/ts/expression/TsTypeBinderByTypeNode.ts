import {TsTypeNode} from "./../../../compiler";
import {TypeFunctionParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {TsParameteredBinderByTypeNode} from "./../base";
import {TsTypeFunctionParameterBinder} from "./TsTypeFunctionParameterBinder";
import {TsExpressionBinder} from "./TsExpressionBinder";

export class TsTypeBinderByTypeNode extends TypeBinder {
    constructor(private readonly factory: TsFactory, private readonly tsTypeNode: TsTypeNode) {
        super(
            new TsExpressionBinder(tsTypeNode),
            new TsParameteredBinderByTypeNode(factory, tsTypeNode, TypeFunctionParameterDefinition, TsTypeFunctionParameterBinder)
        );
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

    getResolvedType() {
        return this.factory.getType(this.tsTypeNode.getType());
    }

    getCallSignatures() {
        return [];
    }

    getProperties() {
        return this.tsTypeNode.getMemberNodes().map(p => this.factory.getTypePropertyFromNode(p));
    }

    getTypeArguments() {
        return this.tsTypeNode.getTypeArgumentsTypeNodes().map(arg => this.factory.getTypeFromTypeNode(arg));
    }

    getTypeParameters() {
        return this.tsTypeNode.getTypeParameterNodes().map(param => this.factory.getTypeParameter(param));
    }
}
