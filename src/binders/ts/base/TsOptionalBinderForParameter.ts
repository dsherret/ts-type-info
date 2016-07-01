import {TsNode} from "./../../../compiler";
import {OptionalBinder} from "./../../base";

export class TsOptionalBinderForParameter extends OptionalBinder {
    constructor(private node: TsNode) {
        super();
    }

    getIsOptional() {
        return this.node.isParameterOptional();
    }
}
