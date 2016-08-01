import {TypeAliasDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {ExportableBinder} from "./../base/ExportableBinder";
import {TypedBinder} from "./../base/TypedBinder";
import {TypeParameteredBinder} from "./../base/TypeParameteredBinder";
import {AmbientableBinder} from "./../base/AmbientableBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeAliasBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly exportableBinder: ExportableBinder,
        private readonly TypedBinder: TypedBinder,
        private readonly typeParameteredBinder: TypeParameteredBinder,
        private readonly ambientableBinder: AmbientableBinder
    ) {
    }

    bind(def: TypeAliasDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.TypedBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.ambientableBinder.bind(def);
    }
}
