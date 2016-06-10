import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderBySignature extends ReturnTypedBinder {
    constructor(private factory: TsFactory, private signature: TsSignature) {
        super();
    }

    getReturnTypeExpression() {
        return this.factory.getType(this.signature.getReturnTypeExpression());
    }
}
