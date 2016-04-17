import {CallSignatureDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class CallSignatureWriter extends BaseDefinitionWriter<CallSignatureDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private parametersWriter = new ParametersWriter(this.writer);

    protected writeDefault(def: CallSignatureDefinition, flags: WriteFlags) {
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.parametersWriter.write(def.parameters, flags);
        this.typeExpressionWriter.writeWithColon(def.returnTypeExpression);
        this.writer.write(";").newLine();
    }
}
