import {TypeExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class TypeExpressionWriter extends BaseWriter {
    writeWithColon(def: TypeExpressionDefinition) {
        if (def != null) {
            let text = def.text;

            this.writer.write(": " + text);
        }
    }
}
