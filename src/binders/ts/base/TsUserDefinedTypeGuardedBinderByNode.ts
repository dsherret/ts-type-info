import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {UserDefinedTypeGuardDefinition} from "./../../../definitions";
import {UserDefinedTypeGuardedBinder} from "./../../base";

export class TsUserDefinedTypeGuardedBinderByNode extends UserDefinedTypeGuardedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    protected getUserDefinedTypeGuard() {
        let userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null = null;

        for (let node of this.node.getChildren()) {
            if (node.isUserDefinedTypeGuard()) {
                userDefinedTypeGuard = this.factory.getUserDefinedTypeGuardFromNode(node);
                break;
            }
        }

        return userDefinedTypeGuard;
    }
}
