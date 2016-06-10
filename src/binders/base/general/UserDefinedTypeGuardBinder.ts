import {UserDefinedTypeGuardDefinition, TypeExpressionDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class UserDefinedTypeGuardBinder implements IBaseBinder {
    protected abstract getParameterName(): string;
    protected abstract getType(): TypeExpressionDefinition;

    bind(def: UserDefinedTypeGuardDefinition) {
        def.parameterName = this.getParameterName();
        def.type = this.getType();
    }
}
