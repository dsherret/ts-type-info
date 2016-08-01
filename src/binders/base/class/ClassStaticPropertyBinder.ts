import {ClassStaticPropertyDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassPropertyBinder} from "./base";

export abstract class ClassStaticPropertyBinder implements IBaseBinder {
    constructor(private readonly baseClassPropertyBinder: BaseClassPropertyBinder) {
    }

    bind(def: ClassStaticPropertyDefinition) {
        this.baseClassPropertyBinder.bind(def);
    }
}
