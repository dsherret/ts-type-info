import {InterfaceNewSignatureDefinition, InterfaceNewSignatureParameterDefinition} from "./../../../definitions";
import {ParameteredBinder, ReturnTypedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfaceNewSignatureBinder implements IBaseBinder {
    constructor(
        private parameterBinder: ParameteredBinder<InterfaceNewSignatureParameterDefinition>,
        private returnTypedBinder: ReturnTypedBinder
    ) {
    }

    bind(def: InterfaceNewSignatureDefinition) {
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);
    }
}
