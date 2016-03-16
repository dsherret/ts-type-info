import {TsNode} from "./../../../wrappers";
import {NamedBinder} from "./../../base";

export class TsNamedBinder extends NamedBinder {
    constructor(private node: TsNode) {
        super();
    }

    getName() {
        return this.node.getName();
    }
}
