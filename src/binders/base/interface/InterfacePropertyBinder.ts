import {InterfacePropertyDefinition} from "./../../../definitions";
import {BasePropertyBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfacePropertyBinder implements IBaseBinder {
    constructor(private basePropertyBinder: BasePropertyBinder) {
    }

    bind(def: InterfacePropertyDefinition) {
        this.basePropertyBinder.bind(def);
    }
}
