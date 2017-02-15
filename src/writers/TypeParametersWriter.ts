import CodeBlockWriter from "code-block-writer";
import {TypeParameterDefinition} from "./../definitions";
import {TypeParameterWriter} from "./TypeParameterWriter";

export class TypeParametersWriter {
    constructor(private readonly writer: CodeBlockWriter, private readonly typeParameterWriter: TypeParameterWriter) {
    }

    write(typeParameters: TypeParameterDefinition[]) {
        if (typeParameters.length === 0)
            return;

        this.writer.write("<");
        this.writeTypeParameters(typeParameters);
        this.writer.write(">");
    }

    private writeTypeParameters(typeParameters: TypeParameterDefinition[]) {
        typeParameters.forEach((p, i) => {
            this.writer.conditionalWrite(i !== 0, ", ");
            this.typeParameterWriter.write(p);
        });
    }
}
