import {TsNode} from "./../../../wrappers";
import {AbstractableBinder} from "./../../base";

export class TsAbstractableBinder extends AbstractableBinder {
    constructor(private node: TsNode) {
        super();
    }

    getIsAbstract() {
        return this.node.hasAbstractKeyword();
    }
}
