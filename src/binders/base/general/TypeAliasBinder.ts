import {TypeAliasDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {ExportableBinder} from "./../base/ExportableBinder";
import {TypeExpressionedBinder} from "./../base/TypeExpressionedBinder";
import {TypeParameteredBinder} from "./../base/TypeParameteredBinder";
import {AmbientableBinder} from "./../base/AmbientableBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeAliasBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private typeExpressionedBinder: TypeExpressionedBinder,
        private typeParameteredBinder: TypeParameteredBinder,
        private ambientableBinder: AmbientableBinder
    ) {
    }

    bind(def: TypeAliasDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.typeExpressionedBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.ambientableBinder.bind(def);
    }
}
