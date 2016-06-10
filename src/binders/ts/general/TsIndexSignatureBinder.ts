import {TsFactory} from "./../../../factories";
import {TsSignature} from "./../../../compiler";
import {IndexSignatureBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsReturnTypedBinderBySignature} from "./../base";

export class TsIndexSignatureBinder extends IndexSignatureBinder {
    constructor(private factory: TsFactory, private signature: TsSignature) {
        super(
            new TsBaseDefinitionBinder(),
            new TsReturnTypedBinderBySignature(factory, signature)
        );
    }

    getKeyName() {
        return this.signature.getParameters()[0].getName();
    }

    getKeyType() {
        return this.factory.getType(this.signature.getParameters()[0].getOnlyNode().getType());
    }
}
