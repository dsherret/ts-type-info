import {StructureFactory} from "./../../../factories";
import {ClassPropertyStructure} from "./../../../structures";
import {ClassPropertyBinder} from "./../../base";
import {StructureBaseClassPropertyBinder} from "./base";

export class StructureClassPropertyBinder extends ClassPropertyBinder {
    constructor(factory: StructureFactory, private structure: ClassPropertyStructure) {
        super(new StructureBaseClassPropertyBinder(factory, structure));
    }

    getIsAccessor() {
        return this.structure.isAccessor || false;
    }

    getIsReadonly() {
        return this.structure.isReadonly || false;
    }

    getOnWriteGetBody() {
        return this.structure.onWriteGetBody;
    }

    getOnWriteSetBody() {
        return this.structure.onWriteSetBody;
    }
}
