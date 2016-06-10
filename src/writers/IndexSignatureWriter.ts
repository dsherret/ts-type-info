import {IndexSignatureDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class IndexSignatureWriter extends BaseDefinitionWriter<IndexSignatureDefinition> {
    private typeWriter = new TypeWriter(this.writer);

    protected writeDefault(def: IndexSignatureDefinition, flags: WriteFlags) {
        this.writer.write(`[${def.keyName}`);
        this.typeWriter.writeWithColon(def.keyType);
        this.writer.write("]");
        this.typeWriter.writeWithColon(def.returnType);
        this.writer.write(";").newLine();
    }
}
