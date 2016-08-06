import {CallSignatureDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {TypeWriter} from "./TypeWriter";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class CallSignatureWriter extends BaseDefinitionWriter<CallSignatureDefinition> {
    private readonly typeParametersWriter = new TypeParametersWriter(this.writer);
    private readonly typeWriter = new TypeWriter(this.writer);
    private readonly parametersWriter = new ParametersWriter(this.writer);

    protected writeDefault(def: CallSignatureDefinition, flags: WriteFlags) {
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.parametersWriter.write(def, flags);
        this.typeWriter.writeWithColon(def.returnType);
        this.writer.write(";").newLine();
    }
}
