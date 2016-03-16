import {TsNode} from "./../../../wrappers";
import {AmbientableBinder} from "./../../base";

export class TsAmbientableBinder extends AmbientableBinder {
    constructor(private node: TsNode) {
        super();
    }

    getIsAmbient() {
        return this.node.isAmbient();
    }

    getHasDeclareKeyword() {
        return this.node.hasDeclareKeyword();
    }
}
