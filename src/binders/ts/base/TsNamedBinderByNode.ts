import {TsNode} from "./../../../compiler";
import {NamedBinder} from "./../../base";

export class TsNamedBinderByNode extends NamedBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getName() {
        return this.node.getName();
    }
}
