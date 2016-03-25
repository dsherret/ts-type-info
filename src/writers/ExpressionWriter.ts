import {ExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class ExpressionWriter extends BaseWriter {
    writeWithEqualsSign(def: ExpressionDefinition) {
        if (def != null) {
            this.writer.write(" = ");
            this.write(def);
        }
    }

    write(def: ExpressionDefinition) {
        if (def != null) {
            this.writer.write(def.text);
        }
    }
}
