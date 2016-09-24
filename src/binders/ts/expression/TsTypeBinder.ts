import {TsTypeNode, TsType} from "./../../../compiler";
import {CallSignatureDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {TsBaseTypeBinderByType} from "./base";

export class TsTypeBinder extends TypeBinder {
    private readonly getCallSignatureAndProperties: boolean;

    constructor(private readonly factory: TsFactory, private readonly tsType: TsType, private readonly tsTypeNode: TsTypeNode | null) {
        super(new TsBaseTypeBinderByType(factory, tsType));

        this.getCallSignatureAndProperties = tsType.isAnonymousType() && !tsType.isReferenceType() &&
            !tsType.isClassType() && !tsType.isInterfaceType() && !tsType.isUnionType() && !tsType.isIntersectionType() &&
            !tsType.isTupleType();
    }

    getCallSignatures() {
        if (this.getCallSignatureAndProperties) {
            return this.tsType.getCallSignatures().map(c => this.factory.getCallSignatureFromSignature(c));
        }
        else {
            return [] as CallSignatureDefinition[];
        }
    }

    getTypeNode() {
        return this.tsTypeNode == null ? null : this.factory.getTypeNode(this.tsTypeNode);
    }
}
