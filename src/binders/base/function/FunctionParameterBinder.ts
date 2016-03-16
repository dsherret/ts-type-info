import {FunctionParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder, NamedBinder, TypeExpressionedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FunctionParameterBinder implements IBaseBinder {
    constructor(private baseParameterBinder: BaseParameterBinder) {
    }

    bind(def: FunctionParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
