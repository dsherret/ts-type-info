import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypedBinder} from "./../../base";

export class TsTypedBinder extends TypedBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    getType() {
        return this.factory.getType(this.node.getType());
    }
}
