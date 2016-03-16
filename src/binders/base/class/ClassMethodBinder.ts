import {ClassMethodDefinition, ClassMethodParameterDefinition} from "./../../../definitions";
import {AbstractableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassMethodBinder} from "./base";

export abstract class ClassMethodBinder implements IBaseBinder {
    constructor(
        private baseClassMethodBinder: BaseClassMethodBinder<ClassMethodParameterDefinition>,
        private abstractableBinder: AbstractableBinder
    ) {
    }

    bind(def: ClassMethodDefinition) {
        this.baseClassMethodBinder.bind(def);
        this.abstractableBinder.bind(def);
    }
}
