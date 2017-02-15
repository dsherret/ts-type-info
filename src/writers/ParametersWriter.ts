import CodeBlockWriter from "code-block-writer";
import {WriteFlags} from "./../WriteFlags";
import {ParameteredDefinition, ThisTypedDefinition, TypeDefinition, BaseParameterDefinition,
    ParameterDefinitions} from "./../definitions";
import {ParameterWriter} from "./ParameterWriter";
import {ParameterWithDestructuringWriter} from "./ParameterWithDestructuringWriter";
import {TypeWriter} from "./TypeWriter";

export class ParametersWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly parameterWriter: ParameterWriter,
        private readonly parameterWithDestructuringWriter: ParameterWithDestructuringWriter,
        private readonly typeWriter: TypeWriter
    ) {
    }

    write(def: ParameteredDefinition<BaseParameterDefinition, any>, flags: WriteFlags) {
        const thisType = (def as any as ThisTypedDefinition).thisType;

        this.writer.write("(");
        this.writeThisType(thisType);
        def.parameters.forEach((param, i) => {
            this.writer.conditionalWrite(i > 0 || thisType != null, ", ");
            this.writeParameter(param, flags);
        });
        this.writer.write(")");
    }

    private writeParameter(param: ParameterDefinitions, flags: WriteFlags) {
        if (param.destructuringProperties.length === 0)
            this.parameterWriter.write(param, flags);
        else
            this.parameterWithDestructuringWriter.write(param, flags);
    }

    private writeThisType(thisType: TypeDefinition | null) {
        if (thisType == null)
            return;

        this.writer.write("this");
        this.typeWriter.writeWithColon(thisType, "any");
    }
}
