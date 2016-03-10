import CodeBlockWriter from "code-block-writer";
import {WriteFlags} from "./../writeFlags";

export abstract class BaseWriter {
    constructor(protected writer: CodeBlockWriter, protected flags = WriteFlags.Default) {
    }
}
