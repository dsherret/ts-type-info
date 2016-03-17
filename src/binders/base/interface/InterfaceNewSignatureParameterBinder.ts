import {InterfaceNewSignatureParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfaceNewSignatureParameterBinder implements IBaseBinder {
    constructor(private baseParameterBinder: BaseParameterBinder) {
    }

    bind(def: InterfaceNewSignatureParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
