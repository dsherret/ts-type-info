import CodeBlockWriter from "code-block-writer";
import {NamedImportPartDefinition} from "./../definitions";
import {NamedImportPartWriter} from "./NamedImportPartWriter";

export class NamedImportPartsWriter {
    constructor(private readonly writer: CodeBlockWriter, private readonly namedImportPartWriter: NamedImportPartWriter) {
    }

    write(namedImports: NamedImportPartDefinition[]) {
        if (namedImports.length === 0)
            return;

        this.writer.write("{");
        this.writeNamedImportParts(namedImports);
        this.writer.write("}");
    }

    private writeNamedImportParts(namedImports: NamedImportPartDefinition[]) {
        namedImports.forEach((namedImport, i) => {
            this.writer.conditionalWrite(i !== 0, ", ");
            this.namedImportPartWriter.write(namedImport);
        });
    }
}
