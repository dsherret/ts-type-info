import {MainFactory} from "./../../../factories";
import {CallSignatureParameterDefinition} from "./../../../definitions";
import {TsSignature} from "./../../../compiler"
import {CallSignatureBinder} from "./../../base";
import {TsTypeParameteredBinderBySignature, TsParameteredBinderBySignature, TsReturnTypedBinderBySignature} from "./../base";
import {TsCallSignatureParameterBinder} from "./TsCallSignatureParameterBinder";

export class TsCallSignatureBinder extends CallSignatureBinder {
    constructor(mainFactory: MainFactory, private signature: TsSignature) {
        super(
            new TsTypeParameteredBinderBySignature(mainFactory, signature),
            new TsParameteredBinderBySignature(mainFactory, signature, CallSignatureParameterDefinition, TsCallSignatureParameterBinder),
            new TsReturnTypedBinderBySignature(mainFactory, signature)
        );
    }

    getMinArgumentCount() {
        return this.signature.getMinArgumentCount();
    }
}
