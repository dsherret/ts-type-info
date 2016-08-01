import {TypedDefinition, DefaultExpressionedDefinition, OptionalDefinition, BaseDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {ExpressionWriter} from "./ExpressionWriter";
import {BaseWriter} from "./BaseWriter";

type typeWithDefault = TypedDefinition & DefaultExpressionedDefinition & BaseDefinition;

export class TypeWithDefaultExpressionWriter extends BaseWriter {
    private readonly typeWriter = new TypeWriter(this.writer);
    private readonly expressionWriter = new ExpressionWriter(this.writer);

    write(def: typeWithDefault, flags: WriteFlags) {
        const shouldWriteDefaultExpression = this.getShouldWriteDefaultExpression(def, flags);

        if (shouldWriteDefaultExpression) {
            this.writeDefaultExpression(def);
        }
        else {
            this.writeType(def);
        }
    }

    writeWithOptionalCheck(def: typeWithDefault & OptionalDefinition, flags: WriteFlags) {
        const shouldWriteDefaultExpression = this.getShouldWriteDefaultExpression(def, flags);

        if (!shouldWriteDefaultExpression || def.isOptional === true) {
            this.writeType(def);
        }

        if (shouldWriteDefaultExpression) {
            this.writeDefaultExpression(def);
        }
    }

    private getShouldWriteDefaultExpression(def: DefaultExpressionedDefinition, flags: WriteFlags) {
        return ExpressionWriter.willWriteDefaultExpression(def, flags);
    }

    private writeType(def: TypedDefinition) {
        this.typeWriter.writeWithColon(def.type);
    }

    private writeDefaultExpression(def: DefaultExpressionedDefinition) {
        this.expressionWriter.writeWithEqualsSign(def.defaultExpression);
    }
}
