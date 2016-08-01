import {OptionalStructure} from "./../../../structures";
import {OptionalBinder} from "./../../base";

export class StructureOptionalBinder extends OptionalBinder {
    constructor(private readonly structure: OptionalStructure) {
        super();
    }

    getIsOptional() {
        return this.structure.isOptional || false;
    }
}
