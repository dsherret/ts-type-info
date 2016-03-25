import {BaseClassMethodParameterStructure} from "./../../../../structures";
import {BaseClassMethodParameterBinder} from "./../../../base";
import {StructureDecoratableBinder, StructureBaseParameterBinder} from "./../../base";
import {StructureScopedBinder} from "./StructureScopedBinder";

export class StructureBaseClassMethodParameterBinder extends BaseClassMethodParameterBinder {
    constructor(structure: BaseClassMethodParameterStructure) {
        super(
            new StructureBaseParameterBinder(structure),
            new StructureDecoratableBinder(structure),
            new StructureScopedBinder(structure)
        );
    }
}
