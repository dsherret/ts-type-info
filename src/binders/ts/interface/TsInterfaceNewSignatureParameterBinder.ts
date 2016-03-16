import {TsNode} from "./../../../wrappers";
import {MainFactory} from "./../../../factories";
import {InterfaceNewSignatureParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsInterfaceNewSignatureParameterBinder extends InterfaceNewSignatureParameterBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBaseParameterBinder(mainFactory, node));
    }
}
