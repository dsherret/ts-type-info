import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypedBinder} from "./../../base";

export class TsTypedBinderByNode extends TypedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getType() {
        return this.factory.getType(this.node.getType(), this.node.getTypeNode());
    }
}
