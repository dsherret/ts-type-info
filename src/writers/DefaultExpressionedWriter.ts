import CodeBlockWriter from "code-block-writer";
import {DefaultExpressionedDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {StringUtils} from "./../utils";
import {ExpressionWriter} from "./ExpressionWriter";

export class DefaultExpressionedWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly expressionWriter: ExpressionWriter
    ) {
    }

    writeWithEqualsSign(def: DefaultExpressionedDefinition, flags: WriteFlags) {
        const shouldWriteDefaultExpression = this.getShouldWriteDefaultExpression(def, flags);

        if (shouldWriteDefaultExpression)
            this.expressionWriter.writeWithEqualsSign(def.defaultExpression);
    }

    getShouldWriteDefaultExpression(def: DefaultExpressionedDefinition, flags: WriteFlags) {
        return ((flags & WriteFlags.HideExpressions) === 0 &&
            def.defaultExpression != null &&
            !StringUtils.isNullOrWhiteSpace(def.defaultExpression.text));
    }
}
