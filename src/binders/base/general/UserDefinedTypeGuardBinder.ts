import {UserDefinedTypeGuardDefinition, TypeNodeDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class UserDefinedTypeGuardBinder implements IBaseBinder {
    protected abstract getParameterName(): string;
    protected abstract getType(): TypeNodeDefinition;

    bind(def: UserDefinedTypeGuardDefinition) {
        def.parameterName = this.getParameterName();
        def.type = this.getType();
    }
}
