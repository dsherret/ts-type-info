import {StructureFactory} from "./../../../factories";
import {BasePropertyStructure} from "./../../../structures";
import {BasePropertyBinder} from "./../../base";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureOptionalBinder} from "./StructureOptionalBinder";
import {StructureTypedBinder} from "./StructureTypedBinder";
import {StructureBaseDefinitionBinder} from "./StructureBaseDefinitionBinder";

export class StructureBasePropertyBinder extends BasePropertyBinder {
    constructor(private factory: StructureFactory, private structure: BasePropertyStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureOptionalBinder(structure),
            new StructureTypedBinder(factory, structure)
        );
    }
}
