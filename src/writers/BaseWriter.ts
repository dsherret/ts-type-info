import CodeBlockWriter from "code-block-writer";

export abstract class BaseWriter {
    constructor(protected writer: CodeBlockWriter) {
    }
}
