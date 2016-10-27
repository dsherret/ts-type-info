import {NamespaceDeclarationType, NamespaceDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, ModuledBinder, NodedBinder, DocumentationedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class NamespaceBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly exportableBinder: ExportableBinder,
        private readonly ambientableBinder: AmbientableBinder,
        private readonly moduledBinder: ModuledBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly documentationedBinder: DocumentationedBinder
    ) {
    }

    abstract getNamespaceDeclarationType(): NamespaceDeclarationType;

    bind(def: NamespaceDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.moduledBinder.bind(def);
        this.nodedBinder.bind(def);
        this.documentationedBinder.bind(def);
        def.declarationType = this.getNamespaceDeclarationType();
    }
}
