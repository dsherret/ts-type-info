import {FunctionParameterDefinition, FunctionDefinition} from "./../../../definitions";
import {BaseFunctionBinder, AmbientableBinder, AsyncableBinder, ExportableBinder, FunctionBodyWriteableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FunctionBinder implements IBaseBinder {
    constructor(
        private baseFunctionBinder: BaseFunctionBinder<FunctionParameterDefinition>,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder,
        private asyncableBinder: AsyncableBinder,
        private functionBodyWriteableBinder: FunctionBodyWriteableBinder
    ) {
    }

    bind(def: FunctionDefinition) {
        this.baseFunctionBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.asyncableBinder.bind(def);
        this.functionBodyWriteableBinder.bind(def);
    }
}
