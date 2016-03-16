import {EnumMemberDefinition} from "./../../../definitions";
import {NamedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class EnumMemberBinder implements IBaseBinder {
    constructor(private namedBinder: NamedBinder) {
    }

    abstract getValue(): number;

    bind(def: EnumMemberDefinition) {
        this.namedBinder.bind(def);
        def.value = this.getValue();
    }
}
