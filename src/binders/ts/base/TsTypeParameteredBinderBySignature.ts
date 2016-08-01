import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";

export class TsTypeParameteredBinderBySignature extends TypeParameteredBinder {
    constructor(private readonly factory: TsFactory, private readonly signature: TsSignature) {
        super();
    }

    getTypeParameters() {
        return this.signature.getTypeParameters().map(typeParamSymbol => this.factory.getTypeParameter(typeParamSymbol.getOnlyNode()));
    }
}
