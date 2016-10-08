import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {NodedBinder} from "./../../base";

export class TsNodedBinder extends NodedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getTsNode() {
        return this.factory.getShouldIncludeCompilerNodes() ? this.node.getUnderlyingNode() : undefined;
    }
}
