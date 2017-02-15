import CodeBlockWriter from "code-block-writer";
import {CallSignatureDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ParametersWriter} from "./ParametersWriter";

export class CallSignatureWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly typeParametersWriter: TypeParametersWriter,
        private readonly typeWriter: TypeWriter,
        private readonly parametersWriter: ParametersWriter) {
    }

    write(def: CallSignatureDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.typeParametersWriter.write(def.typeParameters);
            this.parametersWriter.write(def, flags);
            this.typeWriter.writeWithColon(def.returnType, "any");
        });
    }
}
