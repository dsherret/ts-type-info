import CodeBlockWriter from "code-block-writer";
import {NamedImportPartDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class NamedImportPartWriter {
    constructor(private readonly writer: CodeBlockWriter, private readonly baseDefinitionWriter: BaseDefinitionWriter) {
    }

    write(def: NamedImportPartDefinition) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            const {alias, name} = def;

            this.writer.write(`${name}`);

            if (alias != null && name !== alias)
                this.writer.write(` as ${alias}`);
        });
    }
}
