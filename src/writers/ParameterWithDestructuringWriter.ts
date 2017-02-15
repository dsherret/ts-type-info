import CodeBlockWriter from "code-block-writer";
import {ParameterDefinitions} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {DefaultExpressionedWriter} from "./DefaultExpressionedWriter";
import {TypeWriter} from "./TypeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ParameterWithDestructuringWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly defaultExpressionedWriter: DefaultExpressionedWriter,
        private readonly typeWriter: TypeWriter
    ) {
    }

    write(param: ParameterDefinitions, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(param, () => {
            this.writeLeftSide(param, flags);
            this.writer.write(": ");
            this.writeRightSide(param);
        });
    }

    private writeLeftSide(param: ParameterDefinitions, flags: WriteFlags) {
        this.surroundInBrances(() => {
            param.destructuringProperties.forEach((p, i) => {
                this.writer.conditionalWrite(i > 0, ", ");
                this.writer.write(p.name);

                if (this.defaultExpressionedWriter.getShouldWriteDefaultExpression(p, flags))
                    this.defaultExpressionedWriter.writeWithEqualsSign(p, flags);
            });
        });
    }

    private writeRightSide(param: ParameterDefinitions) {
        this.surroundInBrances(() => {
            param.destructuringProperties.forEach((p, i) => {
                this.writer.conditionalWrite(i > 0, " ");
                this.writer.conditionalWrite(p.isReadonly, "readonly ");
                this.writer.write(p.name);
                this.writer.conditionalWrite(p.isOptional, "?");
                this.typeWriter.writeWithColon(p.type, "any");
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
