import {BaseClassPropertyDefinition} from "./../../../../definitions";
import {DecoratableBinder, BaseObjectPropertyBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassPropertyBinder {
    constructor(
        private objectPropertyBinder: BaseObjectPropertyBinder,
        private decoratableBinder: DecoratableBinder,
        private scopedBinder: ScopedBinder
    ) {
    }

    bind(def: BaseClassPropertyDefinition) {
        this.objectPropertyBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.scopedBinder.bind(def);
    }
}
