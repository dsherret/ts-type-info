import {BaseParameterDefinition, BaseFunctionDefinition, InterfaceMethodParameterDefinition, InterfaceMethodDefinition} from "./../../../definitions";
import {BaseFunctionBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfaceMethodBinder implements IBaseBinder {
    constructor(
        private baseFunctionBinder: BaseFunctionBinder<InterfaceMethodParameterDefinition>
    ) {
    }

    bind(def: InterfaceMethodDefinition) {
        this.baseFunctionBinder.bind(def);
    }
}
