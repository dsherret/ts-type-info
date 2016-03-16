import {TsNode} from "./../../../../wrappers";
import {ScopedBinder} from "./../../../base";

export class TsScopedBinder extends ScopedBinder {
    constructor(private node: TsNode) {
        super();
    }

    getScope() {
        return this.node.getScope();
    }
}
