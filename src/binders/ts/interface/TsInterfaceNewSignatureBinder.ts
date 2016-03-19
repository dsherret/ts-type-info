import {TsFactory} from "./../../../factories";
import {InterfaceNewSignatureParameterDefinition} from "./../../../definitions";
import {TsSignature} from "./../../../compiler";
import {InterfaceNewSignatureBinder} from "./../../base";
import {TsParameteredBinderBySignature, TsReturnTypedBinderBySignature} from "./../base";
import {TsInterfaceNewSignatureParameterBinder} from "./TsInterfaceNewSignatureParameterBinder";

export class TsInterfaceNewSignatureBinder extends InterfaceNewSignatureBinder {
    constructor(tsFactory: TsFactory, private signature: TsSignature) {
        super(
            new TsParameteredBinderBySignature(tsFactory, signature, InterfaceNewSignatureParameterDefinition, TsInterfaceNewSignatureParameterBinder),
            new TsReturnTypedBinderBySignature(tsFactory, signature)
        );
    }
}
