import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {UserDefinedTypeGuardDefinition} from "./../../../definitions";
import {UserDefinedTypeGuardedBinder} from "./../../base";

export class TsUserDefinedTypeGuardedBinderBySignature extends UserDefinedTypeGuardedBinder {
    constructor(private readonly factory: TsFactory, private readonly signature: TsSignature) {
        super();
    }

    protected getUserDefinedTypeGuard() {
        let userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null = null;

        if (this.signature.hasUserDefinedTypeGuard())
            userDefinedTypeGuard = this.factory.getUserDefinedTypeGuardFromSignature(this.signature);

        return userDefinedTypeGuard;
    }
}
