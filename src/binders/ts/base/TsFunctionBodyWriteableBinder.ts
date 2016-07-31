import {FunctionBodyWriteableBinder} from "./../../base";

export class TsFunctionBodyWriteableBinder extends FunctionBodyWriteableBinder {
    constructor() {
        super();
    }

    getOnWriteFunctionBody() {
        return null;
    }
}
