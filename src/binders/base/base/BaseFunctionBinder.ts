import {BaseParameterDefinition, BaseFunctionDefinition, CallSignatureDefinition} from "./../../../definitions";
import {NamedBinder} from "./NamedBinder";
import {ParameteredBinder} from "./ParameteredBinder";
import {TypeParameteredBinder} from "./TypeParameteredBinder";
import {ReturnTypedBinder} from "./ReturnTypedBinder";

export abstract class BaseFunctionBinder<ParameterType extends BaseParameterDefinition> {
    constructor(
        private namedBinder: NamedBinder,
        private typeParameterBinder: TypeParameteredBinder,
        private parameterBinder: ParameteredBinder<ParameterType>,
        private returnTypedBinder: ReturnTypedBinder
    ) {
    }

    protected abstract getOverloadSignatures(): CallSignatureDefinition[];

    bind(def: BaseFunctionDefinition<ParameterType, any>) {
        this.namedBinder.bind(def);
        this.typeParameterBinder.bind(def);
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);

        def.overloadSignatures.push(...this.getOverloadSignatures());
    }
}
