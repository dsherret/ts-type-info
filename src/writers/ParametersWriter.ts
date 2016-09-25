import {WriteFlags} from "./../WriteFlags";
import {ParameteredDefinition, ClassConstructorParameterScope, ThisTypedDefinition, TypeDefinition, BaseParameterDefinition,
    ClassConstructorParameterDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {ParameterWriter} from "./ParameterWriter";
import {ParameterWithDestructuringWriter} from "./ParameterWithDestructuringWriter";
import {TypeWriter} from "./TypeWriter";

export class ParametersWriter extends BaseWriter {
    private readonly parameterWriter = new ParameterWriter(this.writer);
    private readonly parameterWithDestructuringWriter = new ParameterWithDestructuringWriter(this.writer);
    private readonly typeWriter = new TypeWriter(this.writer);

    write(def: ParameteredDefinition<BaseParameterDefinition, any>, flags: WriteFlags) {
        const thisType = (def as any as ThisTypedDefinition).thisType;

        this.writer.write("(");
        this.writeThisType(thisType);

        def.parameters.forEach((param, i) => {
            this.writer.conditionalWrite(i > 0 || thisType != null, ", ");

            if (param.destructuringProperties.length === 0) {
                if (param instanceof ClassConstructorParameterDefinition) {
                    if ((flags & WriteFlags.HideScopeOnParameters) === 0) {
                        this.writeScope(param.scope, flags);
                        this.writer.conditionalWrite(param.isReadonly, "readonly ");
                    }
                }

                this.parameterWriter.write(param, flags);
            }
            else {
                this.parameterWithDestructuringWriter.write(param, flags);
            }
        });
        this.writer.write(")");
    }

    private writeThisType(thisType: TypeDefinition | null) {
        if (thisType != null) {
            this.writer.write("this");
            this.typeWriter.writeWithColon(thisType);
        }
    }

    private writeScope(scope: ClassConstructorParameterScope, flags: WriteFlags) {
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
