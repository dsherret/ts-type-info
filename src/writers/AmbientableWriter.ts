import CodeBlockWriter from "code-block-writer";
import {AmbientableDefinition} from "./../definitions";

export class AmbientableWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeDeclareKeyword(def: AmbientableDefinition) {
        this.writer.conditionalWrite(def.hasDeclareKeyword, "declare ");
    }
}
