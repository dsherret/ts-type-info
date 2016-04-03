import {BaseClassMethodDefinition, BaseClassMethodParameterDefinition} from "./../../../../definitions";
import {DecoratableBinder, BaseFunctionBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition> {
    constructor(
        private baseFunctionBinder: BaseFunctionBinder<ParameterType>,
        private decoratableBinder: DecoratableBinder,
        private scopedBinder: ScopedBinder
    ) {
    }

    bind(def: BaseClassMethodDefinition<any>) {
        this.baseFunctionBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.scopedBinder.bind(def);
    }
}
