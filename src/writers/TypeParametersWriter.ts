﻿import {TypeParameterDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {TypeParameterWriter} from "./TypeParameterWriter";

export class TypeParametersWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer, this.flags);

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

            this.typeParameterWriter.write(p);
        });
    }
}
