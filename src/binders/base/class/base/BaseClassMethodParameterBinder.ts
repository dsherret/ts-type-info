import {BaseClassMethodParameterDefinition} from "./../../../../definitions";
import {BaseParameterBinder, DecoratableBinder, NodedBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassMethodParameterBinder {
    constructor(
        private readonly baseParameterBinder: BaseParameterBinder,
        private readonly decoratableBinder: DecoratableBinder,
        private readonly scopedBinder: ScopedBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: BaseClassMethodParameterDefinition) {
        this.baseParameterBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.scopedBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
