import {TsNode} from "./../../../compiler";
import {AmbientableBinder} from "./../../base";

export class TsAmbientableBinder extends AmbientableBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getIsAmbient() {
        return this.node.isAmbient();
    }

    getHasDeclareKeyword() {
        return this.node.hasDeclareKeyword();
    }
}
