import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {CallSignatureParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsCallSignatureParameterBinder extends CallSignatureParameterBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(new TsBaseParameterBinder(tsFactory, node));
    }
}
