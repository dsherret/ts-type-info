import {StructureFactory} from "./../../../factories";
import {ClassMethodParameterStructure} from "./../../../structures";
import {ClassMethodParameterBinder} from "./../../base";
import {StructureBaseClassMethodParameterBinder} from "./base";

export class StructureClassMethodParameterBinder extends ClassMethodParameterBinder {
    constructor(factory: StructureFactory, structure: ClassMethodParameterStructure) {
        super(new StructureBaseClassMethodParameterBinder(factory, structure));
    }
}
