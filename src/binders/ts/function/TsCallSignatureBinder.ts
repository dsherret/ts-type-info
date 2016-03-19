import {TsFactory} from "./../../../factories";
import {CallSignatureParameterDefinition} from "./../../../definitions";
import {TsSignature} from "./../../../compiler";
import {CallSignatureBinder} from "./../../base";
import {TsTypeParameteredBinderBySignature, TsParameteredBinderBySignature, TsReturnTypedBinderBySignature} from "./../base";
import {TsCallSignatureParameterBinder} from "./TsCallSignatureParameterBinder";

export class TsCallSignatureBinder extends CallSignatureBinder {
    constructor(tsFactory: TsFactory, private signature: TsSignature) {
        super(
            new TsTypeParameteredBinderBySignature(tsFactory, signature),
            new TsParameteredBinderBySignature(tsFactory, signature, CallSignatureParameterDefinition, TsCallSignatureParameterBinder),
            new TsReturnTypedBinderBySignature(tsFactory, signature)
        );
    }

    getMinArgumentCount() {
        return this.signature.getMinArgumentCount();
    }
}
