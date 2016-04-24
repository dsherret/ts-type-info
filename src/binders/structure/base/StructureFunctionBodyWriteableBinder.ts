import {FunctionBodyWriteableStructure} from "./../../../structures";
import {FunctionBodyWriteableBinder} from "./../../base";

export class StructureFunctionBodyWriteableBinder extends FunctionBodyWriteableBinder {
    constructor(private structure: FunctionBodyWriteableStructure) {
        super();
    }

    getOnWriteFunctionBody() {
        return this.structure.onWriteFunctionBody;
    }
}
