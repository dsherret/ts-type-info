import {TypeFunctionParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeFunctionParameterBinder implements IBaseBinder {
    constructor(private readonly baseParameterBinder: BaseParameterBinder) {
    }

    bind(def: TypeFunctionParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
