import {WriteFlags} from "./../WriteFlags";
import {ParameterDefinitions, ClassConstructorParameterScope} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {ParameterWriter} from "./ParameterWriter";

export class ParametersWriter extends BaseWriter {
    private parameterWriter = new ParameterWriter(this.writer);

    write(parameters: ParameterDefinitions[], flags: WriteFlags) {
        this.writer.write("(");
        parameters.forEach((param, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            if (param.isClassConstructorParameterDefinition()) {
                this.writeScope(param.scope, flags);
            }

            this.parameterWriter.write(param, flags);
        });
        this.writer.write(")");
    }

    private writeScope(scope: ClassConstructorParameterScope, flags: WriteFlags) {
        if ((flags & WriteFlags.HideScopeOnParameters) === 0) {
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
}
