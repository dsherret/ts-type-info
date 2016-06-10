import {TypeDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class TypeWriter extends BaseWriter {
    writeWithColon(def: TypeDefinition) {
        if (def != null) {
            let text = def.text;

            this.writer.write(": " + text);
        }
    }
}
