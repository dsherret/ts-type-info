import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypedBinder} from "./../../base";

export class TsTypedBinder extends TypedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getType() {
        const typeNode = this.node.getTypeNode();
        return typeNode == null ? this.factory.getType(this.node.getType()) : this.factory.getTypeFromTypeNode(typeNode);
    }
}
