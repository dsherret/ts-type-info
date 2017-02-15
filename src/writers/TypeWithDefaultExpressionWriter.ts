import CodeBlockWriter from "code-block-writer";
import {TypedDefinition, DefaultExpressionedDefinition, OptionalDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {DefaultExpressionedWriter} from "./DefaultExpressionedWriter";

type typeWithDefault = TypedDefinition & DefaultExpressionedDefinition;

export class TypeWithDefaultExpressionWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly typeWriter: TypeWriter,
        private readonly defaultExpressionedWriter: DefaultExpressionedWriter
    ) {
    }

    write(def: typeWithDefault, flags: WriteFlags, fallbackType: string) {
        const shouldWriteDefaultExpression = this.defaultExpressionedWriter.getShouldWriteDefaultExpression(def, flags);

        if (shouldWriteDefaultExpression)
            this.writeDefaultExpression(def, flags);
        else
            this.writeType(def, fallbackType);
    }

    writeWithOptionalCheck(def: typeWithDefault & OptionalDefinition, flags: WriteFlags, fallbackType: string) {
        const shouldWriteDefaultExpression = this.defaultExpressionedWriter.getShouldWriteDefaultExpression(def, flags);

        if (!shouldWriteDefaultExpression || def.isOptional)
            this.writeType(def, fallbackType);

        if (shouldWriteDefaultExpression)
            this.writeDefaultExpression(def, flags);
    }

    private writeType(def: TypedDefinition, fallbackType: string) {
        this.typeWriter.writeWithColon(def.type, fallbackType);
    }

    private writeDefaultExpression(def: DefaultExpressionedDefinition, flags: WriteFlags) {
        this.defaultExpressionedWriter.writeWithEqualsSign(def, flags);
    }
}
