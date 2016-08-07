import {TsFactory} from "./../../../factories";
import {TsSignature} from "./../../../compiler";
import {IndexSignatureBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsReturnTypedBinderBySignature, TsReadonlyableBinder} from "./../base";

export class TsIndexSignatureBinder extends IndexSignatureBinder {
    constructor(private readonly factory: TsFactory, private readonly signature: TsSignature) {
        super(
            new TsBaseDefinitionBinder(),
            new TsReturnTypedBinderBySignature(factory, signature),
            new TsReadonlyableBinder(signature.getDeclaration())
        );
    }

    getKeyName() {
        return this.signature.getParameters()[0].getName();
    }

    getKeyType() {
        return this.factory.getType(this.signature.getParameters()[0].getOnlyNode().getType());
    }
}
