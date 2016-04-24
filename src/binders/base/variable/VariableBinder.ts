import {VariableDefinition, VariableDeclarationType} from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, TypeExpressionedBinder, DefaultExpressionedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class VariableBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder,
        private typeExpressionedBinder: TypeExpressionedBinder,
        private defaultExpressionedBinder: DefaultExpressionedBinder
    ) {
    }

    abstract getDeclarationType(): VariableDeclarationType;

    bind(def: VariableDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeExpressionedBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);

        def.declarationType = this.getDeclarationType();
    }
}
