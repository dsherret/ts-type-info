import {EnumMemberDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class EnumMemberBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder
    ) {
    }

    abstract getValue(): number;

    bind(def: EnumMemberDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        def.value = this.getValue();
    }
}
