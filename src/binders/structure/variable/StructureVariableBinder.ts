import {VariableDeclarationType} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {VariableStructure} from "./../../../structures";
import {VariableBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureDefaultExpressionedBinder,
    StructureTypedBinder, StructureNodedBinder, StructureDocumentationedBinder} from "./../base";

export class StructureVariableBinder extends VariableBinder {
    constructor(factory: StructureFactory, private readonly structure: VariableStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(structure),
            new StructureTypedBinder(factory, structure),
            new StructureDefaultExpressionedBinder(structure),
            new StructureNodedBinder(),
            new StructureDocumentationedBinder(structure)
        );
    }

    getDeclarationType() {
        return this.structure.declarationType || VariableDeclarationType.Let;
    }
}
