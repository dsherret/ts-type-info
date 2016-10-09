import {FunctionParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FunctionParameterBinder implements IBaseBinder {
    constructor(
        private readonly baseParameterBinder: BaseParameterBinder,
    ) {
    }

    bind(def: FunctionParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
