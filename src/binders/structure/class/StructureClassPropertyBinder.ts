﻿import {StructureFactory} from "./../../../factories";
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

    getIsAccessor() {
        return this.structure.isAccessor || false;
    }

    getIsReadonly() {
        return this.structure.isReadonly || false;
    }

    getOnWriteGetBody() {
        return this.structure.onWriteGetBody || null;
    }

    getOnWriteSetBody() {
        return this.structure.onWriteSetBody || null;
    }
}
