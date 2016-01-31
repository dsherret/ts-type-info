import {ParameterDefinitions} from "./../definitions";
import {ExpressionWriter} from "./expression-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {BaseWriter} from "./base-writer";
import {WriteFlags} from "./../write-flags";

export class ParameterWriter extends BaseWriter {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private expressionWriter = new ExpressionWriter(this.writer);

    write(parameters: ParameterDefinitions[], flags: WriteFlags) {
        this.writer.write("(");
        parameters.forEach((param, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            this.writeRestParameter(param);
            this.writer.write(param.name);
            this.writeIsOptional(param);
            this.writer.write(": ");
            this.typeExpressionWriter.write(param.typeExpression);

            if (flags & WriteFlags.ParameterDefaultExpressions) {
                this.expressionWriter.writeWithEqualsSign(param.defaultExpression);
            }
        });
        this.writer.write(")");
    }

    private writeRestParameter(param: ParameterDefinitions) {
        if (param.isRestParameter) {
            this.writer.write("...");
        }
    }

    private writeIsOptional(param: ParameterDefinitions) {
        if (param.isOptional && !param.isRestParameter) {
            this.writer.write("?");
        }
    }
}
