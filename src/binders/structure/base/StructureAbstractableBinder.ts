import {AbstractableStructure} from "./../../../structures";
import {AbstractableBinder} from "./../../base";

export class StructureAbstractableBinder extends AbstractableBinder {
    constructor(private structure: AbstractableStructure) {
        super();
    }

    getIsAbstract() {
        return this.structure.isAbstract || false;
    }
}
