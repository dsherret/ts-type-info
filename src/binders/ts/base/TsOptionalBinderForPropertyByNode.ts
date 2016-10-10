import {TsNode} from "./../../../compiler";
import {OptionalBinder} from "./../../base";

export class TsOptionalBinderForPropertyByNode extends OptionalBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getIsOptional() {
        return this.node.isPropertyOptional();
    }
}
