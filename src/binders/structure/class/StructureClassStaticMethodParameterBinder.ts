import {ClassStaticMethodParameterStructure} from "./../../../structures";
import {ClassStaticMethodParameterBinder} from "./../../base";
import {StructureBaseClassMethodParameterBinder} from "./base";

export class StructureClassStaticMethodParameterBinder extends ClassStaticMethodParameterBinder {
    constructor(structure: ClassStaticMethodParameterStructure) {
        super(new StructureBaseClassMethodParameterBinder(structure));
    }
}
