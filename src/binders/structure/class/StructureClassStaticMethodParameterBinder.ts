import {StructureFactory} from "./../../../factories";
import {ClassStaticMethodParameterStructure} from "./../../../structures";
import {ClassStaticMethodParameterBinder} from "./../../base";
import {StructureBaseClassMethodParameterBinder} from "./base";

export class StructureClassStaticMethodParameterBinder extends ClassStaticMethodParameterBinder {
    constructor(factory: StructureFactory, structure: ClassStaticMethodParameterStructure) {
        super(new StructureBaseClassMethodParameterBinder(factory, structure));
    }
}
