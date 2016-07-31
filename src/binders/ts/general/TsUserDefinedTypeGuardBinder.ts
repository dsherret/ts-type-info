import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {UserDefinedTypeGuardBinder} from "./../../base";

export class TsUserDefinedTypeGuardBinder extends UserDefinedTypeGuardBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    protected getParameterName() {
        return this.node.getUserDefinedTypeGuardParameterName();
    }

    protected getType() {
        return this.factory.getType(this.node.getUserDefinedTypeGuardType()!);
    }
}
