import CodeBlockWriter from "code-block-writer";
import {IndexSignatureDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeWriter} from "./TypeWriter";

export class IndexSignatureWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly typeWriter: TypeWriter) {
    }

    write(def: IndexSignatureDefinition) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.writer.conditionalWrite(def.isReadonly, "readonly ");
            this.writer.write(`[${def.keyName}`);
            this.typeWriter.writeWithColon(def.keyType, "any");
            this.writer.write("]");
            this.typeWriter.writeWithColon(def.returnType, "any");
        });
    }
}
