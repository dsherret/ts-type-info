import {ClassPropertyStructure} from "./../../../structures";
import {ClassPropertyBinder} from "./../../base";
import {StructureBaseClassPropertyBinder} from "./base";

export class StructureClassPropertyBinder extends ClassPropertyBinder {
    constructor(private structure: ClassPropertyStructure) {
        super(new StructureBaseClassPropertyBinder(structure));
    }

    getIsAccessor() {
        return this.structure.isAccessor || false;
    }

    getIsReadonly() {
        return this.structure.isReadonly || false;
    }

    getIsConstructorParameter() {
        return this.structure.isConstructorParameter || false;
    }

    getOnWriteGetBody() {
        return this.structure.onWriteGetBody;
    }

    getOnWriteSetBody() {
        return this.structure.onWriteSetBody;
    }
}
