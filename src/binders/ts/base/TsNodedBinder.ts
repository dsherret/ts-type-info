import {TsNode} from "./../../../compiler";
import {NodedBinder} from "./../../base";

export class TsNodedBinder extends NodedBinder {
    constructor(private readonly node: TsNode | null) {
        super();
    }

    getTsNode() {
        return this.node == null ? undefined : this.node.getUnderlyingNode();
    }
}
