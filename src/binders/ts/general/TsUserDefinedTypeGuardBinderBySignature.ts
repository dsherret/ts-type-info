import {TsSignature} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {UserDefinedTypeGuardBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinderNull} from "./../base";

export class TsUserDefinedTypeGuardBinderBySignature extends UserDefinedTypeGuardBinder {
    constructor(private readonly factory: TsFactory, private readonly signature: TsSignature) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNodedBinderNull()
        );
    }

    protected getParameterName() {
        return this.signature.getUserDefinedTypeGuard()!.parameterName;
    }

    protected getType() {
        return this.factory.getType(this.signature.getUserDefinedTypeGuard()!.type, null);
    }
}
