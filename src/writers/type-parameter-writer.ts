import {TypeParameterDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";

export class TypeParameterWriter extends BaseWriter {
    write(typeParameters: TypeParameterDefinition<any>[]) {
        if (typeParameters.length > 0) {
            this.writer.write("<");
            this.writeTypeParameters(typeParameters);
            this.writer.write(">");
        }
    }

    private writeTypeParameters(typeParameters: TypeParameterDefinition<any>[]) {
        typeParameters.forEach((p, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            this.writeTypeParameter(p);
        });
    }

    private writeTypeParameter(typeParameter: TypeParameterDefinition<any>) {
        this.writer.write(typeParameter.name);

        if (typeParameter.constraintTypeExpression != null) {
            this.writer.write(` extends ${typeParameter.constraintTypeExpression.text}`);
        }
    }
}
