import {TsNode} from "./../../../wrappers";
import {MainFactory} from "./../../../factories";
import {CallSignatureParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsCallSignatureParameterBinder extends CallSignatureParameterBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBaseParameterBinder(mainFactory, node));
    }
}
