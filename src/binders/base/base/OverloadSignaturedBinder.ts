import {OverloadSignaturedDefinition, CallSignatureDefinition} from "./../../../definitions";

export abstract class OverloadSignaturedBinder {
    protected abstract getOverloadSignatures(): CallSignatureDefinition[];

    bind(def: OverloadSignaturedDefinition) {
        def.overloadSignatures.push(...this.getOverloadSignatures());
    }
}
