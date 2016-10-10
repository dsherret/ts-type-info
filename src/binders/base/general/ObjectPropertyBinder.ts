import {ObjectPropertyDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseObjectPropertyBinder} from "./../base/BaseObjectPropertyBinder";
import {NodedBinder} from "./../base/NodedBinder";

export abstract class ObjectPropertyBinder implements IBaseBinder {
    constructor(
        private readonly baseObjectPropertyBinder: BaseObjectPropertyBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: ObjectPropertyDefinition) {
        this.baseObjectPropertyBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
