import {StructureFactory} from "./../../../factories";
import {ClassConstructorParameterDefinition} from "./../../../definitions";
import {ClassConstructorStructure} from "./../../../structures";
import {ClassConstructorBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureParameteredBinder, StructureFunctionBodyWriteableBinder, StructureNodedBinder,
    StructureOverloadSignaturedBinder} from "./../base";
import {StructureClassConstructorParameterBinder} from "./StructureClassConstructorParameterBinder";
import {StructureScopedBinder} from "./base";

export class StructureClassConstructorBinder extends ClassConstructorBinder {
    constructor(factory: StructureFactory, structure: ClassConstructorStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureParameteredBinder(factory, structure, ClassConstructorParameterDefinition, StructureClassConstructorParameterBinder),
            new StructureFunctionBodyWriteableBinder(structure),
            new StructureScopedBinder(structure),
            new StructureNodedBinder(),
            new StructureOverloadSignaturedBinder(factory, structure)
        );
    }
}
