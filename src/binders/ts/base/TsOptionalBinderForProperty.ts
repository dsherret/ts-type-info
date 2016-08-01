import {TsNode} from "./../../../compiler";
import {OptionalBinder} from "./../../base";

export class TsOptionalBinderForProperty extends OptionalBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getIsOptional() {
        return this.node.isPropertyOptional();
    }
}
