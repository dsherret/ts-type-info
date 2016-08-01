import {ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ParameteredBinder, FunctionBodyWriteableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ClassConstructorBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly parameteredBinder: ParameteredBinder<ClassConstructorParameterDefinition>,
        private readonly functionBodyWriteableBinder: FunctionBodyWriteableBinder
    ) {
    }

    bind(def: ClassConstructorDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.parameteredBinder.bind(def);
        this.functionBodyWriteableBinder.bind(def);
    }
}
