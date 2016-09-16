import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {UserDefinedTypeGuardBinder} from "./../../base";

export class TsUserDefinedTypeGuardBinder extends UserDefinedTypeGuardBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    protected getParameterName() {
        return this.node.getUserDefinedTypeGuardParameterName();
    }

    protected getType() {
        return this.factory.getTypeFromTypeNode(this.node.getUserDefinedTypeGuardTypeNode()!);
    }
}
