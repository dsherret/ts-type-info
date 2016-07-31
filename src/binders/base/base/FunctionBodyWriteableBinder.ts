import CodeBlockWriter from "code-block-writer";
import {FunctionBodyWriteableDefinition} from "./../../../definitions";

export abstract class FunctionBodyWriteableBinder {
    abstract getOnWriteFunctionBody(): ((writer: CodeBlockWriter) => void) | null;

    bind(def: FunctionBodyWriteableDefinition) {
        def.onWriteFunctionBody = this.getOnWriteFunctionBody();
    }
}
