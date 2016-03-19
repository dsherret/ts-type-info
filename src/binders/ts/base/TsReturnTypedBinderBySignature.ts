import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderBySignature extends ReturnTypedBinder {
    constructor(private tsFactory: TsFactory, private signature: TsSignature) {
        super();
    }

    getReturnTypeExpression() {
        return this.tsFactory.getTypeExpression(this.signature.getReturnTypeExpression());
    }
}
