import {BaseClassMethodDefinition, BaseClassMethodParameterDefinition} from "./../../../../definitions";
import {AsyncableBinder, DecoratableBinder, BaseFunctionBinder, FunctionBodyWriteableBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition> {
    constructor(
        private readonly baseFunctionBinder: BaseFunctionBinder<ParameterType>,
        private readonly decoratableBinder: DecoratableBinder,
        private readonly scopedBinder: ScopedBinder,
        private readonly asyncableBinder: AsyncableBinder,
        private readonly functionBodyWriteableBinder: FunctionBodyWriteableBinder
    ) {
    }

    bind(def: BaseClassMethodDefinition<ParameterType, any>) {
        this.baseFunctionBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.scopedBinder.bind(def);
        this.asyncableBinder.bind(def);
        this.functionBodyWriteableBinder.bind(def);
    }
}
