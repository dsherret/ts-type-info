import CodeBlockWriter from "code-block-writer";
import {FunctionBodyWriteableBinder} from "./../../base";

export class TsFunctionBodyWriteableBinder extends FunctionBodyWriteableBinder {
    constructor() {
        super();
    }

    getOnWriteFunctionBody() {
        return null as (writer: CodeBlockWriter) => void;
    }
}
