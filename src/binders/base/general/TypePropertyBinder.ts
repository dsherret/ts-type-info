import {TypePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {BasePropertyBinder} from "./../base/BasePropertyBinder";
import {NodedBinder} from "./../base/NodedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypePropertyBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly basePropertyBinder: BasePropertyBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    bind(def: TypePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.basePropertyBinder.bind(def);
        this.nodedBinder.bind(def);
    }
}
