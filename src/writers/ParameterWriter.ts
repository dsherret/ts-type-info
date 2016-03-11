import {ParameterDefinitions} from "./../definitions";
import {ExpressionWriter} from "./ExpressionWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {WriteFlags} from "./../WriteFlags";

export class ParameterWriter extends BaseDefinitionWriter<ParameterDefinitions> {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer, this.flags);
    private expressionWriter = new ExpressionWriter(this.writer, this.flags);

    protected writeDefault(param: ParameterDefinitions) {
        this.writeRestParameter(param);
        this.writer.write(param.name);
        this.writeIsOptional(param);
        this.writer.write(": ");
        this.typeExpressionWriter.write(param.typeExpression);

        if ((this.flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions) {
            this.expressionWriter.writeWithEqualsSign(param.defaultExpression);
        }
    }

    private writeRestParameter(param: ParameterDefinitions) {
        if (param.isRestParameter) {
            this.writer.write("...");
        }
    }

    private writeIsOptional(param: ParameterDefinitions) {
        const isOptionalNotRest = param.isOptional && !param.isRestParameter;
        const willWriteDefaultExpression = param.defaultExpression != null &&
                                           (this.flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions;

        if (isOptionalNotRest && !willWriteDefaultExpression) {
            this.writer.write("?");
        }
    }
}
