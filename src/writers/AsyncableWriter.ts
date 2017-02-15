import CodeBlockWriter from "code-block-writer";
import {AsyncableDefinition} from "./../definitions";

export class AsyncableWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeAsyncKeyword(def: AsyncableDefinition) {
        this.writer.conditionalWrite(def.isAsync, "async ");
    }
}
