import {ClassStaticPropertyStructure} from "./../../../structures";
import {ClassStaticPropertyBinder} from "./../../base";
import {StructureBaseClassPropertyBinder} from "./base";

export class StructureClassStaticPropertyBinder extends ClassStaticPropertyBinder {
    constructor(structure: ClassStaticPropertyStructure) {
        super(new StructureBaseClassPropertyBinder(structure));
    }
}
