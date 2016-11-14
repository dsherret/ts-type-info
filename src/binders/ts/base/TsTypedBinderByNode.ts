import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypedBinder} from "./../../base";

export class TsTypedBinderByNode extends TypedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getType() {
        const type = this.node.getType();

        if (type == null)
            return this.factory.getTypeFromText("any");

        return this.factory.getType(type, this.node.getTypeNode());
    }
}
