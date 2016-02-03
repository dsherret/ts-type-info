import {TypeAliasDefinition} from "./../definitions";
import {TypeParameterWriter} from "./type-parameter-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {BaseWriter} from "./base-writer";

export class TypeAliasWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);

    write(def: TypeAliasDefinition) {
        this.writeDeclareClause(def);
        this.writeExportClause(def);
        this.writer.write("type ").write(def.name);
        this.typeParameterWriter.write(def.typeParameters);
        this.writer.write(" = ");
        this.typeExpressionWriter.write(def.typeExpression);
        this.writer.write(";").newLine();
    }
}
