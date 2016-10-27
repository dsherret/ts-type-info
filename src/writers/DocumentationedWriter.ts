import {DocumentationedDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class DocumentationedWriter extends BaseWriter {
    write(def: DocumentationedDefinition) {
        if (def.documentationComment == null || def.documentationComment.length === 0)
            return;

        if (!/^\s*\/\*\*[\s\S]*\*\//.test(def.documentationComment))
            this.writeWithComment(def.documentationComment);
        else
            this.writer.writeLine(def.documentationComment);
    }

    private writeWithComment(text: string) {
        this.writer.writeLine("/**");
        text.split(/\r?\n/).forEach(line => this.writer.write(" * ").write(line).newLine());
        this.writer.writeLine(" */");
    }
}
