import {StructureFactory} from "./../../../factories";
import {ClassConstructorParameterDefinition} from "./../../../definitions";
import {ClassConstructorStructure} from "./../../../structures";
import {ClassConstructorBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureParameteredBinder, StructureFunctionBodyWriteableBinder} from "./../base";
import {StructureClassConstructorParameterBinder} from "./StructureClassConstructorParameterBinder";

export class StructureClassConstructorBinder extends ClassConstructorBinder {
    constructor(factory: StructureFactory, structure: ClassConstructorStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureParameteredBinder(factory, structure, ClassConstructorParameterDefinition, StructureClassConstructorParameterBinder),
            new StructureFunctionBodyWriteableBinder(structure)
        );
    }
}
