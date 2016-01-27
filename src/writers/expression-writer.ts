import {Expression} from "./../expressions";
import {BaseWriter} from "./base-writer";

export class ExpressionWriter extends BaseWriter {
    writeWithEqualsSign(expression: Expression) {
        if (expression != null) {
            this.writer.write(" = ");
            this.writer.write(expression.text);
        }
    }
}
