import {BaseParameterDefinition, BaseFunctionDefinition} from "./../../../definitions";
import {NamedBinder} from "./NamedBinder";
import {ParameteredBinder} from "./ParameteredBinder";
import {TypeParameteredBinder} from "./TypeParameteredBinder";
import {ReturnTypedBinder} from "./ReturnTypedBinder";

export abstract class BaseFunctionBinder<ParameterType extends BaseParameterDefinition<any>> {
    constructor(
        private namedBinder: NamedBinder,
        private typeParameterBinder: TypeParameteredBinder,
        private parameterBinder: ParameteredBinder<ParameterType>,
        private returnTypedBinder: ReturnTypedBinder
    ) {
    }

    bind(def: BaseFunctionDefinition<any, ParameterType>) {
        this.namedBinder.bind(def);
        this.typeParameterBinder.bind(def);
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);
    }
}
