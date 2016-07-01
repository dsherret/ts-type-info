import {OptionalStructure} from "./../../../structures";
import {OptionalBinder} from "./../../base";

export class StructureOptionalBinder extends OptionalBinder {
    constructor(private structure: OptionalStructure) {
        super();
    }

    getIsOptional() {
        return this.structure.isOptional || false;
    }
}
