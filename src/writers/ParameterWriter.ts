import {ParameterDefinitions} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ExpressionWriter} from "./ExpressionWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ParameterWriter extends BaseDefinitionWriter<ParameterDefinitions> {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private expressionWriter = new ExpressionWriter(this.writer);

    protected writeDefault(param: ParameterDefinitions, flags: WriteFlags) {
        this.writeRestParameter(param);
        this.writer.write(param.name);
        this.writeIsOptional(param, flags);

        if (!ExpressionWriter.willWriteDefaultExpression(param, flags)) {
            this.typeExpressionWriter.writeWithColon(param.typeExpression);
        }
        else {
            this.expressionWriter.writeWithEqualsSign(param.defaultExpression);
        }
    }

    private writeRestParameter(param: ParameterDefinitions) {
        if (param.isRestParameter) {
            this.writer.write("...");
        }
    }

    private writeIsOptional(param: ParameterDefinitions, flags: WriteFlags) {
        const isOptionalNotRest = param.isOptional && !param.isRestParameter;
        const willWriteDefaultExpression = param.defaultExpression != null && (flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions;

        if (isOptionalNotRest && !willWriteDefaultExpression) {
            this.writer.write("?");
        }
    }
}
