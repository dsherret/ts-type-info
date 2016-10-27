import {InterfacePropertyDefinition} from "./../../../definitions";
import {BasePropertyBinder, NodedBinder, DocumentationedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfacePropertyBinder implements IBaseBinder {
    constructor(
        private readonly basePropertyBinder: BasePropertyBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly documentationedBinder: DocumentationedBinder
    ) {
    }

    bind(def: InterfacePropertyDefinition) {
        this.basePropertyBinder.bind(def);
        this.nodedBinder.bind(def);
        this.documentationedBinder.bind(def);
    }
}
