import {TypeExpression} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class TypeExpressionWriter extends BaseWriter {
    write(typeExpression: TypeExpression) {
        this.writer.write(typeExpression.text);
    }
}
