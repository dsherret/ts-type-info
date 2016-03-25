import {TypeAliasDefinition} from "./../definitions";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ExpressionWriter} from "./ExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class TypeAliasWriter extends BaseDefinitionWriter<TypeAliasDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private expressionWriter = new ExpressionWriter(this.writer, this.flags);

    protected writeDefault(def: TypeAliasDefinition) {
        this.writeDeclareClause(def);
        this.writeExportClause(def);
        this.writer.write("type ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);
        this.expressionWriter.writeWithEqualsSign(def.typeExpression);
        this.writer.write(";").newLine();
    }
}
