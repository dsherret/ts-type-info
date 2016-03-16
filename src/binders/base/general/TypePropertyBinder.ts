import {TypePropertyDefinition} from "./../../../definitions";
import {BasePropertyBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypePropertyBinder implements IBaseBinder {
    constructor(private basePropertyBinder: BasePropertyBinder) {
    }

    bind(def: TypePropertyDefinition) {
        this.basePropertyBinder.bind(def);
    }
}
