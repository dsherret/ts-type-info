import {FunctionParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FunctionParameterBinder implements IBaseBinder {
    constructor(
        private readonly baseParameterBinder: BaseParameterBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: FunctionParameterDefinition) {
        this.baseParameterBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
