import {TypeParameterDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class TypeParameterWriter extends BaseDefinitionWriter<TypeParameterDefinition> {
    protected writeDefault(typeParameter: TypeParameterDefinition) {
        this.writer.write(typeParameter.name);

        if (typeParameter.constraintType != null) {
            this.writer.write(` extends ${typeParameter.constraintType.text}`);
        }
    }
}
