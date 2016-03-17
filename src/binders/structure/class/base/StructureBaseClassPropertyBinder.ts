import {BaseClassPropertyStructure} from "./../../../../structures";
import {BaseClassPropertyBinder} from "./../../../base";
import {StructureDecoratableBinder, StructureObjectPropertyBinder} from "./../../base";
import {StructureScopedBinder} from "./StructureScopedBinder";

export class StructureBaseClassPropertyBinder extends BaseClassPropertyBinder {
    constructor(structure: BaseClassPropertyStructure) {
        super(
            new StructureObjectPropertyBinder(structure),
            new StructureDecoratableBinder(structure),
            new StructureScopedBinder(structure)
        );
    }
}
