import {StructureFactory} from "./../../../../factories";
import {BaseClassPropertyStructure} from "./../../../../structures";
import {BaseClassPropertyBinder} from "./../../../base";
import {StructureDecoratableBinder, StructureBaseObjectPropertyBinder} from "./../../base";
import {StructureScopedBinder} from "./StructureScopedBinder";

export class StructureBaseClassPropertyBinder extends BaseClassPropertyBinder {
    constructor(factory: StructureFactory, structure: BaseClassPropertyStructure) {
        super(
            new StructureBaseObjectPropertyBinder(factory, structure),
            new StructureDecoratableBinder(factory, structure),
            new StructureScopedBinder(structure)
        );
    }
}
