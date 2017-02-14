import {UserDefinedTypeGuardDefinition, TypeDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NodedBinder} from "./../base/NodedBinder";

export abstract class UserDefinedTypeGuardBinder implements IBaseBinder {
    protected abstract getParameterName(): string | null;
    protected abstract getType(): TypeDefinition;

    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: UserDefinedTypeGuardDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.nodedBinder.bind(def);
        def.parameterName = this.getParameterName();
        def.type = this.getType();
    }
}
