import {NamespaceDeclarationType} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {NamespaceStructure} from "./../../../structures";
import {NamespaceBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureModuledBinder} from "./../base";

export class StructureNamespaceBinder extends NamespaceBinder {
    constructor(factory: StructureFactory, private structure: NamespaceStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(structure),
            new StructureModuledBinder(factory, structure)
        );
    }

    getNamespaceDeclarationType() {
        return this.structure.declarationType || NamespaceDeclarationType.Namespace;
    }
}
