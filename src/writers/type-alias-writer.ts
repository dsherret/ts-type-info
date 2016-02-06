import {TypeAliasDefinition} from "./../definitions";
import {TypeParametersWriter} from "./type-parameters-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {BaseDefinitionWriter} from "./base-definition-writer";

export class TypeAliasWriter extends BaseDefinitionWriter<TypeAliasDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer, this.flags);

    protected writeDefault(def: TypeAliasDefinition) {
        this.writeDeclareClause(def);
        this.writeExportClause(def);
        this.writer.write("type ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);
        this.writer.write(" = ");
        this.typeExpressionWriter.write(def.typeExpression);
        this.writer.write(";").newLine();
    }
}
