import {InterfacePropertyDefinition} from "./../../../definitions";
import {BasePropertyBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfacePropertyBinder implements IBaseBinder {
    constructor(
        private readonly basePropertyBinder: BasePropertyBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: InterfacePropertyDefinition) {
        this.basePropertyBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
