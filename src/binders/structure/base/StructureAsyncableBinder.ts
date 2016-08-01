import {AsyncableStructure} from "./../../../structures";
import {AsyncableBinder} from "./../../base";

export class StructureAsyncableBinder extends AsyncableBinder {
    constructor(private readonly structure: AsyncableStructure) {
        super();
    }

    getIsAsync() {
        return this.structure.isAsync || false;
    }
}
