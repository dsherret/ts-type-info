import CodeBlockWriter from "code-block-writer";
import {TypeParameterDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeWriter} from "./TypeWriter";

export class TypeParameterWriter {
    constructor(private writer: CodeBlockWriter, private baseDefinitionWriter: BaseDefinitionWriter, private typeWriter: TypeWriter) {
    }

    write(typeParameter: TypeParameterDefinition) {
        this.baseDefinitionWriter.writeWrap(typeParameter, () => {
            this.writer.write(typeParameter.name);

            if (typeParameter.constraintType != null) {
                this.writer.write(" extends ");
                this.typeWriter.write(typeParameter.constraintType, "any");
            }
        });
    }
}
