import {JsDocedDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class JsDocedWriter extends BaseWriter {
    write(def: JsDocedDefinition) {
        if (def.jsDocText == null || def.jsDocText.length === 0)
            return;

        if (!/^\s*\/\*\*[\s\S]*\*\//.test(def.jsDocText))
            this.writeWithComment(def.jsDocText);
        else
            this.writer.writeLine(def.jsDocText);
    }

    private writeWithComment(text: string) {
        this.writer.writeLine("/**");
        text.split(/\r?\n/).forEach(line => this.writer.write(" * ").write(line).newLine());
        this.writer.writeLine(" */");
    }
}
