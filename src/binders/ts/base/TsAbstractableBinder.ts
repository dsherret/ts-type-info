import {TsNode} from "./../../../compiler";
import {AbstractableBinder} from "./../../base";

export class TsAbstractableBinder extends AbstractableBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getIsAbstract() {
        return this.node.hasAbstractKeyword();
    }
}
