import {TsNode} from "./../../../compiler";
import {AsyncableBinder} from "./../../base";

export class TsAsyncableBinder extends AsyncableBinder {
    constructor(private node: TsNode) {
        super();
    }

    getIsAsync() {
        return this.node.hasAsyncKeyword();
    }
}
