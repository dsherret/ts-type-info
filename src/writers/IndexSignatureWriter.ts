import {IndexSignatureDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class IndexSignatureWriter extends BaseDefinitionWriter<IndexSignatureDefinition> {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);

    protected writeDefault(def: IndexSignatureDefinition, flags: WriteFlags) {
        this.writer.write(`[${def.keyName}`);
        this.typeExpressionWriter.writeWithColon(def.keyTypeExpression);
        this.writer.write("]");
        this.typeExpressionWriter.writeWithColon(def.returnTypeExpression);
        this.writer.write(";").newLine();
    }
}
