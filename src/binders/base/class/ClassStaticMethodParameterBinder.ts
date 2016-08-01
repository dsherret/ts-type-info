import {ClassStaticMethodParameterDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassMethodParameterBinder} from "./base";

export abstract class ClassStaticMethodParameterBinder implements IBaseBinder {
    constructor(private readonly baseClassMethodParameterBinder: BaseClassMethodParameterBinder) {
    }

    bind(def: ClassStaticMethodParameterDefinition) {
        this.baseClassMethodParameterBinder.bind(def);
    }
}
