import {FunctionParameterDefinition, FunctionDefinition} from "./../../../definitions";
import {BaseFunctionBinder, AmbientableBinder, AsyncableBinder, ExportableBinder, FunctionBodyWriteableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FunctionBinder implements IBaseBinder {
    constructor(
        private readonly baseFunctionBinder: BaseFunctionBinder<FunctionParameterDefinition>,
        private readonly exportableBinder: ExportableBinder,
        private readonly ambientableBinder: AmbientableBinder,
        private readonly asyncableBinder: AsyncableBinder,
        private readonly functionBodyWriteableBinder: FunctionBodyWriteableBinder
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
