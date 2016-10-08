import {InterfaceMethodParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfaceMethodParameterBinder implements IBaseBinder {
    constructor(
        private readonly baseParameterBinder: BaseParameterBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: InterfaceMethodParameterDefinition) {
        this.baseParameterBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
