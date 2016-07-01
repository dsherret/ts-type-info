import {ParameterDefinitions} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";

export class ParameterWriter extends BaseDefinitionWriter<ParameterDefinitions> {
    private typeWithDefaultExpressionWriter = new TypeWithDefaultExpressionWriter(this.writer);

    protected writeDefault(param: ParameterDefinitions, flags: WriteFlags) {
        this.writeRestParameter(param);
        this.writer.write(param.name);
        this.writeIsOptional(param, flags);
        this.typeWithDefaultExpressionWriter.write(param, flags);
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
