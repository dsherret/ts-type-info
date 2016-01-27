import {TypeExpression} from "./../expressions";
import {BaseWriter} from "./base-writer";

export class TypeExpressionWriter extends BaseWriter {
    write(typeExpression: TypeExpression) {
        this.writer.write(typeExpression.text);
    }
}
