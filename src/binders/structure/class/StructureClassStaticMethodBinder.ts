import {StructureFactory} from "./../../../factories";
import {ClassStaticMethodParameterDefinition} from "./../../../definitions";
import {ClassStaticMethodStructure} from "./../../../structures";
import {ClassStaticMethodBinder} from "./../../base";
import {StructureClassStaticMethodParameterBinder} from "./StructureClassStaticMethodParameterBinder";
import {StructureBaseClassMethodBinder} from "./base";

export class StructureClassStaticMethodBinder extends ClassStaticMethodBinder {
    constructor(factory: StructureFactory, structure: ClassStaticMethodStructure) {
        super(
            new StructureBaseClassMethodBinder(
                factory,
                structure,
                ClassStaticMethodParameterDefinition,
                StructureClassStaticMethodParameterBinder
            )
        );
    }
}
