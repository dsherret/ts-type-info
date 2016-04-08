import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";

export class TsTypeParameteredBinderBySignature extends TypeParameteredBinder {
    constructor(private factory: TsFactory, private signature: TsSignature) {
        super();
    }

    getTypeParameters() {
        return this.signature.getTypeParameters().map(typeParamSymbol => this.factory.getTypeParameter(typeParamSymbol.getOnlyNode()));
    }
}
