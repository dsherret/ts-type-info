import {TsFactory} from "./../../../factories";
import {InterfaceNewSignatureParameterDefinition} from "./../../../definitions";
import {TsSignature} from "./../../../compiler";
import {InterfaceNewSignatureBinder} from "./../../base";
import {TsParameteredBinderBySignature, TsReturnTypedBinderBySignature} from "./../base";
import {TsInterfaceNewSignatureParameterBinder} from "./TsInterfaceNewSignatureParameterBinder";

export class TsInterfaceNewSignatureBinder extends InterfaceNewSignatureBinder {
    constructor(factory: TsFactory, signature: TsSignature) {
        super(
            new TsParameteredBinderBySignature(factory, signature, InterfaceNewSignatureParameterDefinition, TsInterfaceNewSignatureParameterBinder),
            new TsReturnTypedBinderBySignature(factory, signature)
        );
    }
}
