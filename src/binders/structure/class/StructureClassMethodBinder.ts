import {StructureFactory} from "./../../../factories";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {ClassMethodStructure} from "./../../../structures";
import {ClassMethodBinder} from "./../../base";
import {StructureAbstractableBinder} from "./../base";
import {StructureClassMethodParameterBinder} from "./StructureClassMethodParameterBinder";
import {StructureBaseClassMethodBinder} from "./base";

export class StructureClassMethodBinder extends ClassMethodBinder {
    constructor(factory: StructureFactory, structure: ClassMethodStructure) {
        super(
            new StructureBaseClassMethodBinder(
                factory,
                structure,
                ClassMethodParameterDefinition,
                StructureClassMethodParameterBinder
            ),
            new StructureAbstractableBinder(structure)
        );
    }
}
