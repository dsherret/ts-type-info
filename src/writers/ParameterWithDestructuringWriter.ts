import {ParameterDefinitions} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ExpressionWriter} from "./ExpressionWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ParameterWithDestructuringWriter extends BaseDefinitionWriter<ParameterDefinitions> {
    private expressionWriter = new ExpressionWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);

    protected writeDefault(param: ParameterDefinitions, flags: WriteFlags) {
        this.writeLeftSide(param, flags);
        this.writer.write(": ");
        this.writeRightSide(param);
    }

    private writeLeftSide(param: ParameterDefinitions, flags: WriteFlags) {
        this.surroundInBrances(() => {
            param.destructuringProperties.forEach((p, i) => {
                this.writer.conditionalWrite(i > 0, ", ");
                this.writer.write(p.name);

                if (ExpressionWriter.willWriteDefaultExpression(p, flags) && p.defaultExpression != null) {
                    this.expressionWriter.writeWithEqualsSign(p.defaultExpression);
                }
            });
        });
    }

    private writeRightSide(param: ParameterDefinitions) {
        this.surroundInBrances(() => {
            param.destructuringProperties.forEach((p, i) => {
                this.writer.conditionalWrite(i > 0, " ");
                this.writer.write(p.name);
                this.writer.conditionalWrite(p.isOptional, "?");
                this.typeExpressionWriter.writeWithColon(p.typeExpression);
                this.writer.write(";");
            });
        });
    }

    private surroundInBrances(func: () => void) {
        this.writer.write("{ ");
        func();
        this.writer.write(" }");
    }
}
