import {TsSignature} from "./../../../wrappers";
import {MainFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderBySignature extends ReturnTypedBinder {
    constructor(private mainFactory: MainFactory, private signature: TsSignature) {
        super();
    }

    getReturnTypeExpression() {
        return this.mainFactory.getTypeExpression(this.signature.getReturnTypeExpression());
    }
}
