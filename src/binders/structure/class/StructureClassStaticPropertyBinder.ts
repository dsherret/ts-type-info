import {StructureFactory} from "./../../../factories";
import {ClassStaticPropertyStructure} from "./../../../structures";
import {ClassStaticPropertyBinder} from "./../../base";
import {StructureBaseClassPropertyBinder} from "./base";

export class StructureClassStaticPropertyBinder extends ClassStaticPropertyBinder {
    constructor(factory: StructureFactory, structure: ClassStaticPropertyStructure) {
        super(new StructureBaseClassPropertyBinder(factory, structure));
    }
}
