import {VariableDefinition, VariableDeclarationType} from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, TypedBinder, DefaultExpressionedBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class VariableBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly exportableBinder: ExportableBinder,
        private readonly ambientableBinder: AmbientableBinder,
        private readonly typedBinder: TypedBinder,
        private readonly defaultExpressionedBinder: DefaultExpressionedBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getDeclarationType(): VariableDeclarationType;

    bind(def: VariableDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typedBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);
        this.nodedBinder.bind(def);

        def.declarationType = this.getDeclarationType();
    }
}
