import * as definitions from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {ParameteredBinder} from "./ParameteredBinder";
import {TypeParameteredBinder} from "./TypeParameteredBinder";
import {ReturnTypedBinder} from "./ReturnTypedBinder";

export abstract class BaseFunctionBinder<ParameterType extends definitions.BaseParameterDefinition> {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly typeParameterBinder: TypeParameteredBinder,
        private readonly parameterBinder: ParameteredBinder<ParameterType>,
        private readonly returnTypedBinder: ReturnTypedBinder
    ) {
    }

    protected abstract getOverloadSignatures(): definitions.CallSignatureDefinition[];
    protected abstract getUserDefinedTypeGuard(): definitions.UserDefinedTypeGuardDefinition | null;
    protected abstract getIsGenerator(): boolean;

    bind(def: definitions.BaseFunctionDefinition<ParameterType, any>) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.typeParameterBinder.bind(def);
        this.parameterBinder.bind(def);
        this.returnTypedBinder.bind(def);

        def.isGenerator = this.getIsGenerator();
        def.overloadSignatures.push(...this.getOverloadSignatures());
        def.userDefinedTypeGuard = this.getUserDefinedTypeGuard();

        if (def.userDefinedTypeGuard != null) {
            def.returnType.text = (def.userDefinedTypeGuard.parameterName || "this") + " is " + def.userDefinedTypeGuard.type.text;
        }
    }
}
