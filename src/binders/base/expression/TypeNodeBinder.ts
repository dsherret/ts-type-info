import {TypeNodeDefinition, TypeFunctionParameterDefinition} from "./../../../definitions";
import {ParameteredBinder, TypeParameteredBinder, NodedBinder} from "./../base";
import {BaseTypeBinder} from "./base";

export abstract class TypeNodeBinder {
    // todo: remove null and use null object pattern
    constructor(
        private readonly baseTypeBinder: BaseTypeBinder,
        private readonly parameteredBinder: ParameteredBinder<TypeFunctionParameterDefinition> | null,
        private readonly typeParameteredBinder: TypeParameteredBinder | null,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: TypeNodeDefinition) {
        this.baseTypeBinder.bind(def);
        if (this.parameteredBinder != null)
            this.parameteredBinder.bind(def);
        if (this.typeParameteredBinder != null)
            this.typeParameteredBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
