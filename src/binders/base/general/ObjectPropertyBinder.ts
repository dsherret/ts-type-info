import {ObjectPropertyDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseObjectPropertyBinder} from "./../base/BaseObjectPropertyBinder";

export abstract class ObjectPropertyBinder implements IBaseBinder {
    constructor(private readonly baseObjectPropertyBinder: BaseObjectPropertyBinder) {
    }

    bind(def: ObjectPropertyDefinition) {
        this.baseObjectPropertyBinder.bind(def);
    }
}
