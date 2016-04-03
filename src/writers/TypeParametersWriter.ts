import {TypeParameterDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";
import {TypeParameterWriter} from "./TypeParameterWriter";

export class TypeParametersWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);

    write(typeParameters: TypeParameterDefinition[], flags: WriteFlags) {
        if (typeParameters.length > 0) {
            this.writer.write("<");
            this.writeTypeParameters(typeParameters, flags);
            this.writer.write(">");
        }
    }

    private writeTypeParameters(typeParameters: TypeParameterDefinition[], flags: WriteFlags) {
        typeParameters.forEach((p, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            this.typeParameterWriter.write(p, flags);
        });
    }
}
