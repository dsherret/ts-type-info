import {TsNode} from "./../../../compiler";
import {ReadonlyableBinder} from "./../../base";

export class TsReadonlyableBinderForPropertyByNode extends ReadonlyableBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getIsReadonly() {
        return this.node.isPropertyReadonly();
    }
}
