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

    getKeyTypeExpression() {
        return this.factory.getTypeExpression(this.signature.getParameters()[0].getOnlyNode().getTypeExpression());
    }
}
