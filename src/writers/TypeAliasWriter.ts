import {TypeAliasDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ExpressionWriter} from "./ExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class TypeAliasWriter extends BaseDefinitionWriter<TypeAliasDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private expressionWriter = new ExpressionWriter(this.writer);

    protected writeDefault(def: TypeAliasDefinition, flags: WriteFlags) {
        this.writeDeclareKeyword(def);
        this.writeExportKeyword(def, flags);
        this.writer.write("type ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.expressionWriter.writeWithEqualsSign(def.typeExpression);
        this.writer.write(";").newLine();
    }
}
