import {TsNode} from "./../../../wrappers";
import {MainFactory} from "./../../../factories";
import {InterfaceMethodParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsInterfaceMethodParameterBinder extends InterfaceMethodParameterBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBaseParameterBinder(mainFactory, node));
    }
}
