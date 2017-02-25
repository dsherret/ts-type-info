import {UserDefinedTypeGuardedDefinition, UserDefinedTypeGuardDefinition, ReturnTypedDefinition} from "./../../../definitions";

export abstract class UserDefinedTypeGuardedBinder {
    protected abstract getUserDefinedTypeGuard(): UserDefinedTypeGuardDefinition | null;

    bind(def: UserDefinedTypeGuardedDefinition) {
        def.userDefinedTypeGuard = this.getUserDefinedTypeGuard();

        const returnTypedDefinition = def as any as ReturnTypedDefinition;
        if (def.userDefinedTypeGuard != null && returnTypedDefinition.returnType != null)
            returnTypedDefinition.returnType._text = (def.userDefinedTypeGuard.parameterName || "this") + " is " + def.userDefinedTypeGuard.type.text;
    }
}
