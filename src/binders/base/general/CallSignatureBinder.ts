import {CallSignatureDefinition, CallSignatureParameterDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ParameteredBinder, TypeParameteredBinder, ReturnTypedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class CallSignatureBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly typeParameterBinder: TypeParameteredBinder,
        private readonly parameterBinder: ParameteredBinder<CallSignatureParameterDefinition>,
        private readonly returnTypedBinder: ReturnTypedBinder
    ) {
    }

    bind(def: CallSignatureDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.typeParameterBinder.bind(def);
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);
    }
}
