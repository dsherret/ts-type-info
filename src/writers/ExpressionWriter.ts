import {ExpressionDefinition, DefaultExpressionedDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {StringUtils} from "./../utils";
import {BaseWriter} from "./BaseWriter";

export class ExpressionWriter extends BaseWriter {
    static willWriteDefaultExpression(def: DefaultExpressionedDefinition, flags: WriteFlags) {
        return ((flags & WriteFlags.HideExpressions) === 0 &&
            def.defaultExpression != null &&
            !StringUtils.isNullOrWhiteSpace(def.defaultExpression.text));
    }

    writeWithEqualsSign(def: ExpressionDefinition | null) {
        if (def != null) {
            this.writer.write(" = ");
            this.write(def);
        }
    }

    write(def: ExpressionDefinition | null) {
        if (def != null) {
            this.writer.write(def.text);
        }
    }
}
