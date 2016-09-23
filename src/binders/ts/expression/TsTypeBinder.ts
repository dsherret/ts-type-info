import {TsType} from "./../../../compiler";
import {TypeParameterDefinition, TypeFunctionParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {TsParameteredBinderByType} from "./../base";
import {TsExpressionBinder} from "./TsExpressionBinder";
import {TsTypeFunctionParameterBinder} from "./TsTypeFunctionParameterBinder";

export class TsTypeBinder extends TypeBinder {
    private readonly getCallSignatureAndProperties: boolean;

    constructor(private readonly factory: TsFactory, private readonly tsType: TsType) {
        super(
            new TsExpressionBinder(tsType),
            new TsParameteredBinderByType(factory, tsType, TypeFunctionParameterDefinition, TsTypeFunctionParameterBinder)
        );

        this.getCallSignatureAndProperties = tsType.isAnonymousType() && !tsType.isReferenceType() &&
            !tsType.isClassType() && !tsType.isInterfaceType() && !tsType.isUnionType() && !tsType.isIntersectionType() &&
            !tsType.isTupleType();
    }

    isArrayType() {
        return this.tsType.isArrayType();
    }

    getArrayElementType() {
        const tsType = this.tsType.getArrayElementType();
        return tsType == null ? null : this.factory.getType(tsType);
    }

    isIntersectionType() {
        return this.tsType.isIntersectionType();
    }

    isUnionType() {
        return this.tsType.isUnionType();
    }

    getUnionOrIntersectionTypes() {
        return this.tsType.getUnionOrIntersectionTypes().map(t => this.factory.getType(t));
    }

    getResolvedType() {
        return null;
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
            return this.tsType.getProperties().map(p => this.factory.getTypePropertyFromSymbol(p));
        }
        else {
            return [];
        }
    }

    getTypeArguments() {
        return this.tsType.getTypeArguments().map(arg => this.factory.getType(arg));
    }

    getTypeParameters(): TypeParameterDefinition[] {
        return [];
    }
}
