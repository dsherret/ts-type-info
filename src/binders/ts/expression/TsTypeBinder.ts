import {TsType} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";

export class TsTypeBinder extends TypeBinder {
    private hasCallSignatureAndProperties: boolean;

    constructor(private factory: TsFactory, private tsType: TsType) {
        super();

        this.hasCallSignatureAndProperties = !tsType.isTupleType() && tsType.hasCallSignaturesAndProperties();
    }

    getText() {
        return this.tsType.getText();
    }

    getCallSignatures() {
        if (this.hasCallSignatureAndProperties) {
            return this.tsType.getCallSignatures().map(c => this.factory.getCallSignatureFromSignature(c));
        }
        else {
            return [];
        }
    }

    getProperties() {
        if (this.hasCallSignatureAndProperties) {
            return this.tsType.getProperties().map(p => this.factory.getTypePropertyFromSymbol(p));
        }
        else {
            return [];
        }
    }

    getTypeArguments() {
        return this.tsType.getTypeArguments().map(arg => this.factory.getType(arg));
    }
}
