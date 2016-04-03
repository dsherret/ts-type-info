import {AmbientableStructure} from "./../../../structures";
import {AmbientableBinder} from "./../../base";

export class StructureAmbientableBinder extends AmbientableBinder {
    constructor(private structure: AmbientableStructure) {
        super();
    }

    getIsAmbient() {
        return this.structure.isAmbient;
    }

    getHasDeclareKeyword() {
        return this.structure.hasDeclareKeyword;
    }
}
