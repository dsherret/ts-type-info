import {ClassStaticMethodDefinition, ClassStaticMethodParameterDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassMethodBinder} from "./base";

export abstract class ClassStaticMethodBinder implements IBaseBinder {
    constructor(private baseClassMethodBinder: BaseClassMethodBinder<ClassStaticMethodParameterDefinition>) {
    }

    bind(def: ClassStaticMethodDefinition) {
        this.baseClassMethodBinder.bind(def);
    }
}
