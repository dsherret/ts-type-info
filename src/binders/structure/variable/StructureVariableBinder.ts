import {VariableDeclarationType} from "./../../../definitions";
import {VariableStructure} from "./../../../structures";
import {VariableBinder} from "./../../base";
import {StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureDefaultExpressionedBinder, StructureTypeExpressionedBinder} from "./../base";

export class StructureVariableBinder extends VariableBinder {
    constructor(private structure: VariableStructure) {
        super(
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(structure),
            new StructureTypeExpressionedBinder(structure),
            new StructureDefaultExpressionedBinder(structure)
        );
    }

    getDeclarationType() {
        return this.structure.declarationType || VariableDeclarationType.Let;
    }
}
