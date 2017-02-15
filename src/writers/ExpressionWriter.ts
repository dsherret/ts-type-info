import CodeBlockWriter from "code-block-writer";
import {ExpressionDefinition} from "./../definitions";
import {StringUtils} from "./../utils";

export class ExpressionWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeWithEqualsSign(def: ExpressionDefinition | null) {
        if (!this.shouldWrite(def))
            return;

        this.writer.write(" = ");
        this.write(def);
    }

    write(def: ExpressionDefinition | null) {
        if (!this.shouldWrite(def))
            return;

        this.writer.write(def.text);
    }

    private shouldWrite(def: ExpressionDefinition | null): def is ExpressionDefinition {
        return def != null && !StringUtils.isNullOrWhiteSpace(def.text);
    }
}
