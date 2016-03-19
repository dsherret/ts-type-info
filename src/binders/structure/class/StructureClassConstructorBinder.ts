import {StructureFactory} from "./../../../factories";
import {ClassConstructorParameterDefinition} from "./../../../definitions";
import {ClassConstructorStructure} from "./../../../structures";
import {ClassConstructorBinder} from "./../../base";
import {StructureParameteredBinder} from "./../base";
import {StructureClassConstructorParameterBinder} from "./StructureClassConstructorParameterBinder";

export class StructureClassConstructorBinder extends ClassConstructorBinder {
    constructor(factory: StructureFactory, structure: ClassConstructorStructure) {
        super(
            new StructureParameteredBinder(
                structure,
                ClassConstructorParameterDefinition,
                StructureClassConstructorParameterBinder
            )
        );
    }
}
