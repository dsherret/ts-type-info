import CodeBlockWriter from "code-block-writer";
import {CallSignatureDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ParametersWriter} from "./ParametersWriter";
import {UserDefinedTypeGuardWriter} from "./UserDefinedTypeGuardWriter";

export class CallSignatureWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly typeParametersWriter: TypeParametersWriter,
        private readonly typeWriter: TypeWriter,
        private readonly parametersWriter: ParametersWriter,
        private readonly userDefinedTypeGuardWriter: UserDefinedTypeGuardWriter) {
    }

    write(def: CallSignatureDefinition, flags: WriteFlags) {
        this.writeInternal(def, flags, ": ");
    }

    writeAsType(def: CallSignatureDefinition, flags: WriteFlags) {
        this.writeInternal(def, flags, " => ");
    }

    private writeInternal(def: CallSignatureDefinition, flags: WriteFlags, separator: string) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.typeParametersWriter.write(def.typeParameters);
            this.parametersWriter.write(def, flags);
            this.writer.write(separator);
            if (def.userDefinedTypeGuard != null)
                this.userDefinedTypeGuardWriter.write(def.userDefinedTypeGuard);
            else
                this.typeWriter.write(def.returnType, "any");
        });
    }
}
