import {IndexSignatureDefinition} from "./../definitions";
import {TypeWriter} from "./TypeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class IndexSignatureWriter extends BaseDefinitionWriter<IndexSignatureDefinition> {
    private readonly typeWriter = new TypeWriter(this.writer);

    protected writeDefault(def: IndexSignatureDefinition) {
        this.writer.conditionalWrite(def.isReadonly, "readonly ");
        this.writer.write(`[${def.keyName}`);
        this.typeWriter.writeWithColon(def.keyType);
        this.writer.write("]");
        this.typeWriter.writeWithColon(def.returnType);
        this.writer.write(";").newLine();
    }
}
