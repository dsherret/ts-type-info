import {MainFactory} from "./../../../factories";
import {InterfaceNewSignatureParameterDefinition} from "./../../../definitions";
import {TsSignature} from "./../../../compiler";
import {InterfaceNewSignatureBinder} from "./../../base";
import {TsParameteredBinderBySignature, TsReturnTypedBinderBySignature} from "./../base";
import {TsInterfaceNewSignatureParameterBinder} from "./TsInterfaceNewSignatureParameterBinder";

export class TsInterfaceNewSignatureBinder extends InterfaceNewSignatureBinder {
    constructor(mainFactory: MainFactory, private signature: TsSignature) {
        super(
            new TsParameteredBinderBySignature(mainFactory, signature, InterfaceNewSignatureParameterDefinition, TsInterfaceNewSignatureParameterBinder),
            new TsReturnTypedBinderBySignature(mainFactory, signature)
        );
    }
}
