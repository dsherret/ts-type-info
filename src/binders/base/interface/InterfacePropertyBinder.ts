import {InterfacePropertyDefinition} from "./../../../definitions";
import {BasePropertyBinder, NodedBinder, JsDocedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfacePropertyBinder implements IBaseBinder {
    constructor(
        private readonly basePropertyBinder: BasePropertyBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly jsDocedBinder: JsDocedBinder
    ) {
    }

    bind(def: InterfacePropertyDefinition) {
        this.basePropertyBinder.bind(def);
        this.nodedBinder.bind(def);
        this.jsDocedBinder.bind(def);
    }
}
