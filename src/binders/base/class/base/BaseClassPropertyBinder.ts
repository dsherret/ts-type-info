import {BaseClassPropertyDefinition} from "./../../../../definitions";
import {DecoratableBinder, BaseObjectPropertyBinder, NodedBinder, DocumentationedBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassPropertyBinder {
    constructor(
        private readonly objectPropertyBinder: BaseObjectPropertyBinder,
        private readonly decoratableBinder: DecoratableBinder,
        private readonly scopedBinder: ScopedBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly documentationedBinder: DocumentationedBinder
    ) {
    }

    bind(def: BaseClassPropertyDefinition) {
        this.objectPropertyBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.scopedBinder.bind(def);
        this.nodedBinder.bind(def);
        this.documentationedBinder.bind(def);
    }
}
