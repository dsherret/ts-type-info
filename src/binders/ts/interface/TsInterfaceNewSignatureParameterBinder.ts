import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfaceNewSignatureParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsInterfaceNewSignatureParameterBinder extends InterfaceNewSignatureParameterBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(new TsBaseParameterBinder(tsFactory, node));
    }
}
