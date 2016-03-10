import {ParameterDefinitions, ClassConstructorParameterScope} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {ParameterWriter} from "./ParameterWriter";

export class ParametersWriter extends BaseWriter {
    private parameterWriter = new ParameterWriter(this.writer, this.flags);

    write(parameters: ParameterDefinitions[]) {
        this.writer.write("(");
        parameters.forEach((param, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            if (param.isClassConstructorParameterDefinition()) {
                this.writeScope(param.scope);
            }

            this.parameterWriter.write(param);
        });
        this.writer.write(")");
    }

    private writeScope(scope: ClassConstructorParameterScope) {
        if (scope === ClassConstructorParameterScope.Private) {
            this.writer.write("private ");
        }
        else if (scope === ClassConstructorParameterScope.Protected) {
            this.writer.write("protected ");
        }
        else if (scope === ClassConstructorParameterScope.Public) {
            this.writer.write("public ");
        }
    }
}
