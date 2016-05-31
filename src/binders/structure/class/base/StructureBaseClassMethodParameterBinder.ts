import {StructureFactory} from "./../../../../factories";
import {BaseClassMethodParameterStructure} from "./../../../../structures";
import {BaseClassMethodParameterBinder} from "./../../../base";
import {StructureDecoratableBinder, StructureBaseParameterBinder} from "./../../base";
import {StructureScopedBinder} from "./StructureScopedBinder";

export class StructureBaseClassMethodParameterBinder extends BaseClassMethodParameterBinder {
    constructor(factory: StructureFactory, structure: BaseClassMethodParameterStructure) {
        super(
            new StructureBaseParameterBinder(factory, structure),
            new StructureDecoratableBinder(factory, structure),
            new StructureScopedBinder(structure)
        );
    }
}
