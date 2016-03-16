import {CallSignatureParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder, NamedBinder, TypeExpressionedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class CallSignatureParameterBinder implements IBaseBinder {
    constructor(private baseParameterBinder: BaseParameterBinder) {
    }

    bind(def: CallSignatureParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
