import {ClassMethodParameterStructure} from "./../../../structures";
import {ClassMethodParameterBinder} from "./../../base";
import {StructureBaseClassMethodParameterBinder} from "./base";

export class StructureClassMethodParameterBinder extends ClassMethodParameterBinder {
    constructor(structure: ClassMethodParameterStructure) {
        super(new StructureBaseClassMethodParameterBinder(structure));
    }
}
