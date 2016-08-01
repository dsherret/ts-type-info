import {TsNode} from "./../../../../compiler";
import {ScopedBinder} from "./../../../base";

export class TsScopedBinder extends ScopedBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getScope() {
        return this.node.getScope();
    }
}
