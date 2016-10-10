import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {UserDefinedTypeGuardBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinder} from "./../base";

export class TsUserDefinedTypeGuardBinder extends UserDefinedTypeGuardBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNodedBinder(factory, node)
        );
    }

    protected getParameterName() {
        return this.node.getUserDefinedTypeGuardParameterName();
    }

    protected getType() {
        return this.factory.getTypeFromTypeNode(this.node.getUserDefinedTypeGuardTypeNode()!);
    }
}
