import {TypeExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class TypeExpressionWriter extends BaseWriter {
    write(typeExpression: TypeExpressionDefinition) {
        this.writer.write(typeExpression.text);
    }
}
