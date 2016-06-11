import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderByNode extends ReturnTypedBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    getReturnType() {
        return this.factory.getType(this.node.getReturnType());
    }
}
