import {ExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class ExpressionWriter extends BaseWriter {
    writeWithEqualsSign(expression: ExpressionDefinition) {
        if (expression != null) {
            this.writer.write(" = ");
            this.writer.write(expression.text);
        }
    }
}
