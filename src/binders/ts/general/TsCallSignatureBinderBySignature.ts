import {TsFactory} from "./../../../factories";
import {CallSignatureParameterDefinition} from "./../../../definitions";
import {TsSignature} from "./../../../compiler";
import {CallSignatureBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsTypeParameteredBinderBySignature, TsParameteredBinderBySignature, TsReturnTypedBinderBySignature, TsNodedBinderNull} from "./../base";
import {TsCallSignatureParameterBinder} from "./TsCallSignatureParameterBinder";

export class TsCallSignatureBinderBySignature extends CallSignatureBinder {
    constructor(factory: TsFactory, signature: TsSignature) {
        super(
            new TsBaseDefinitionBinder(),
            new TsTypeParameteredBinderBySignature(factory, signature),
            new TsParameteredBinderBySignature(factory, signature, CallSignatureParameterDefinition, TsCallSignatureParameterBinder),
            new TsReturnTypedBinderBySignature(factory, signature),
            new TsNodedBinderNull()
        );
    }
}
