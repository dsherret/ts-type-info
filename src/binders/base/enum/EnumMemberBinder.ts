import {EnumMemberDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, NodedBinder, DocumentationedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class EnumMemberBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly documentationedBinder: DocumentationedBinder
    ) {
    }

    abstract getValue(): number;

    bind(def: EnumMemberDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.nodedBinder.bind(def);
        this.documentationedBinder.bind(def);
        def.value = this.getValue();
    }
}
