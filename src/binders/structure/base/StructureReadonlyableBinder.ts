import {ReadonlyableStructure} from "./../../../structures";
import {ReadonlyableBinder} from "./../../base";

export class StructureReadonlyableBinder extends ReadonlyableBinder {
    constructor(private readonly structure: ReadonlyableStructure) {
        super();
    }

    getIsReadonly() {
        return this.structure.isReadonly || false;
    }
}
