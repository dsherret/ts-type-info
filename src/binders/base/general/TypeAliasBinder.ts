import {TypeAliasDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {ExportableBinder} from "./../base/ExportableBinder";
import {TypedBinder} from "./../base/TypedBinder";
import {TypeParameteredBinder} from "./../base/TypeParameteredBinder";
import {AmbientableBinder} from "./../base/AmbientableBinder";
import {JsDocedBinder} from "./../base/JsDocedBinder";
import {NodedBinder} from "./../base/NodedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeAliasBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly exportableBinder: ExportableBinder,
        private readonly typedBinder: TypedBinder,
        private readonly typeParameteredBinder: TypeParameteredBinder,
        private readonly ambientableBinder: AmbientableBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly jsDocedBinder: JsDocedBinder
    ) {
    }

    bind(def: TypeAliasDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.typedBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.nodedBinder.bind(def);
        this.jsDocedBinder.bind(def);
    }
}
