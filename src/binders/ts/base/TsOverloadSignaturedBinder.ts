import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {OverloadSignaturedBinder} from "./../../base";

export class TsOverloadSignaturedBinder extends OverloadSignaturedBinder {
    constructor(
        private readonly factory: TsFactory,
        private readonly nodes: TsNode[]
    ) {
        super();
    }

    protected getOverloadSignatures() {
        const overloadNodes = this.nodes.slice(0, this.nodes.length - 1);

        return overloadNodes.map(n => this.factory.getCallSignatureFromNode(n));
    }
}
