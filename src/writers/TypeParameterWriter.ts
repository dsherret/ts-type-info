import {TypeParameterDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class TypeParameterWriter extends BaseDefinitionWriter<TypeParameterDefinition<any>> {
    protected writeDefault(typeParameter: TypeParameterDefinition<any>) {
        this.writer.write(typeParameter.name);

        if (typeParameter.constraintTypeExpression != null) {
            this.writer.write(` extends ${typeParameter.constraintTypeExpression.text}`);
        }
    }
}
