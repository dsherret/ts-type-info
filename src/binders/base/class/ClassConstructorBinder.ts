import {ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./../../../definitions";
import {ParameteredBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ClassConstructorBinder implements IBaseBinder {
    constructor(private parameteredBinder: ParameteredBinder<ClassConstructorParameterDefinition>) {
    }

    bind(def: ClassConstructorDefinition) {
        this.parameteredBinder.bind(def);
    }
}
