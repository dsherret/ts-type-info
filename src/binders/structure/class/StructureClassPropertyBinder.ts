import {ClassPropertyKind} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {ClassPropertyStructure} from "./../../../structures";
import {ClassPropertyBinder} from "./../../base";
import {StructureAbstractableBinder} from "./../base";
import {StructureBaseClassPropertyBinder} from "./base";

export class StructureClassPropertyBinder extends ClassPropertyBinder {
    constructor(factory: StructureFactory, private readonly structure: ClassPropertyStructure) {
        super(
            new StructureBaseClassPropertyBinder(factory, structure),
            new StructureAbstractableBinder(structure)
        );
    }

    getIsConstructorParameter() {
        return false;
    }

    getKind() {
        return this.structure.kind || ClassPropertyKind.Normal;
    }

    getOnWriteGetBody() {
        return this.structure.onWriteGetBody || null;
    }

    getOnWriteSetBody() {
        return this.structure.onWriteSetBody || null;
    }
}
