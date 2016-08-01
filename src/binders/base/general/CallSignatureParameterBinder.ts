import {CallSignatureParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class CallSignatureParameterBinder implements IBaseBinder {
    constructor(private readonly baseParameterBinder: BaseParameterBinder) {
    }

    bind(def: CallSignatureParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
