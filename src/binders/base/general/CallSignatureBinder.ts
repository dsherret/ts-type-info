import {CallSignatureDefinition, CallSignatureParameterDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ParameteredBinder, TypeParameteredBinder, ReturnTypedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class CallSignatureBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private typeParameterBinder: TypeParameteredBinder,
        private parameterBinder: ParameteredBinder<CallSignatureParameterDefinition>,
        private returnTypedBinder: ReturnTypedBinder
    ) {
    }

    bind(def: CallSignatureDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.typeParameterBinder.bind(def);
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);
    }
}
