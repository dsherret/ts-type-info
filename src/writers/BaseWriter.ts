import CodeBlockWriter from "code-block-writer";
import {WriteFlags} from "./../WriteFlags";

export abstract class BaseWriter {
    constructor(protected writer: CodeBlockWriter, protected flags = WriteFlags.Default) {
    }
}
