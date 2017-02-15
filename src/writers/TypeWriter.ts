import CodeBlockWriter from "code-block-writer";
import {TypeDefinition} from "./../definitions";
import {StringUtils} from "./../utils";

export class TypeWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeWithColon(def: TypeDefinition | null, fallbackType: string) {
        this.writer.write(": ");
        this.write(def, fallbackType);
    }

    writeWithEqualsSign(def: TypeDefinition | null, fallbackType: string) {
        this.writer.write(" = ");
        this.write(def, fallbackType);
    }

    write(def: TypeDefinition | null, fallbackType: string) {
        let text = fallbackType;

        if (def != null && def.text != null && !StringUtils.isNullOrWhiteSpace(def.text))
            text = def.text;

        this.writer.write(text);
    }
}
