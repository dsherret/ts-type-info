import {TypeNodeDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class TypeWriter extends BaseWriter {
    writeWithColon(def: TypeNodeDefinition) {
        if (def != null) {
            let text = def.text;

            this.writer.write(": " + text);
        }
    }
}
