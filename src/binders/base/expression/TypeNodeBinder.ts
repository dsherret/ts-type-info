import {TypeNodeDefinition, TypeFunctionParameterDefinition} from "./../../../definitions";
import {ParameteredBinder, TypeParameteredBinder} from "./../base";
import {BaseTypeBinder} from "./base";

export abstract class TypeNodeBinder {
    constructor(
        private readonly baseTypeBinder: BaseTypeBinder,
        private readonly parameteredBinder: ParameteredBinder<TypeFunctionParameterDefinition> | null,
        private readonly typeParameteredBinder: TypeParameteredBinder | null
    ) {
    }

    bind(def: TypeNodeDefinition) {
        this.baseTypeBinder.bind(def);
        if (this.parameteredBinder != null)
            this.parameteredBinder.bind(def);
        if (this.typeParameteredBinder != null)
            this.typeParameteredBinder.bind(def);
    }
}
