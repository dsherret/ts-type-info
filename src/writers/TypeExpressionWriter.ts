import {TypeExpression} from "./../expressions";
import {BaseWriter} from "./BaseWriter";

export class TypeExpressionWriter extends BaseWriter {
    write(typeExpression: TypeExpression) {
        this.writer.write(typeExpression.text);
    }
}
