import {BaseClassPropertyDefinition} from "./../../../../definitions";
import {DecoratableBinder, ObjectPropertyBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassPropertyBinder {
    constructor(
        private objectPropertyBinder: ObjectPropertyBinder,
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
