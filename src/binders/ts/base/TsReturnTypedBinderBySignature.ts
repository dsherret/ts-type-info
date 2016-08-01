import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderBySignature extends ReturnTypedBinder {
    constructor(private readonly factory: TsFactory, private readonly signature: TsSignature) {
        super();
    }

    getReturnType() {
        return this.factory.getType(this.signature.getReturnType());
    }
}
