import {StructureFactory} from "./../../../factories";
import {BasePropertyStructure} from "./../../../structures";
import {BasePropertyBinder} from "./../../base";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureOptionalBinder} from "./StructureOptionalBinder";
import {StructureTypedBinder} from "./StructureTypedBinder";
import {StructureBaseDefinitionBinder} from "./StructureBaseDefinitionBinder";
import {StructureReadonlyableBinder} from "./StructureReadonlyableBinder";

export class StructureBasePropertyBinder extends BasePropertyBinder {
    constructor(factory: StructureFactory, structure: BasePropertyStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureOptionalBinder(structure),
            new StructureTypedBinder(factory, structure),
            new StructureReadonlyableBinder(structure)
        );
    }
}
