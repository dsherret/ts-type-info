import CodeBlockWriter from "code-block-writer";
import {DocumentationedDefinition} from "./../definitions";

export class DocumentationedWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    write(def: DocumentationedDefinition) {
        if (def.documentationComment == null || /^[\s]*$/.test(def.documentationComment))
            return;

        if (!/^\s*\/\*\*[\s\S]*\*\//.test(def.documentationComment))
            this.writeWithComment(def.documentationComment);
        else
            this.writer.write(def.documentationComment);

        this.writer.newLine();
    }

    private writeWithComment(text: string) {
        this.writer.writeLine("/**");
        text.split(/\r?\n/).forEach(line => {
            this.writer.write(" *");
            if (line.length > 0)
                this.writer.write(" ");
            this.writer.write(line).newLine();
        });
        this.writer.write(" */");
    }
}
