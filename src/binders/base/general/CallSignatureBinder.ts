import {CallSignatureDefinition, CallSignatureParameterDefinition} from "./../../../definitions";
import {ParameteredBinder, TypeParameteredBinder, ReturnTypedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class CallSignatureBinder implements IBaseBinder {
    constructor(
        private typeParameterBinder: TypeParameteredBinder,
        private parameterBinder: ParameteredBinder<CallSignatureParameterDefinition>,
        private returnTypedBinder: ReturnTypedBinder
    ) {
    }

    bind(def: CallSignatureDefinition) {
        this.typeParameterBinder.bind(def);
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);
    }
}
