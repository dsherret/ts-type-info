import {TsFactory} from "./../../../factories";
import {TsSignature} from "./../../../compiler";
import {IndexSignatureBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsReturnTypedBinderBySignature, TsReadonlyableBinderByNode} from "./../base";

export class TsIndexSignatureBinder extends IndexSignatureBinder {
    constructor(private readonly factory: TsFactory, private readonly signature: TsSignature) {
        super(
            new TsBaseDefinitionBinder(),
            new TsReturnTypedBinderBySignature(factory, signature),
            new TsReadonlyableBinderByNode(signature.getDeclaration())
        );
    }

    getKeyName() {
        return this.signature.getParameters()[0].getName();
    }

    getKeyType() {
        const node = this.signature.getParameters()[0].getOnlyNode();
        return this.factory.getType(node.getType(), node.getTypeNode());
    }
}
