import {BaseParameterDefinition, BaseFunctionDefinition, FunctionParameterDefinition, FunctionDefinition} from "./../../../definitions";
import {BaseFunctionBinder, ExportableBinder, AmbientableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FunctionBinder implements IBaseBinder {
    constructor(
        private baseFunctionBinder: BaseFunctionBinder<FunctionParameterDefinition>,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder
    ) {
    }

    bind(def: FunctionDefinition) {
        this.baseFunctionBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
    }
}
