import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderByNode extends ReturnTypedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getReturnType() {
        const typeNode = this.node.getTypeNode();
        return typeNode == null ? this.factory.getType(this.node.getReturnType()) : this.factory.getTypeFromTypeNode(typeNode);
    }
}
