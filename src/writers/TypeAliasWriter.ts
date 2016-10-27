import {TypeAliasDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ExpressionWriter} from "./ExpressionWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class TypeAliasWriter extends BaseDefinitionWriter<TypeAliasDefinition> {
    private readonly documentationedWriter = new DocumentationedWriter(this.writer);
    private readonly expressionWriter = new ExpressionWriter(this.writer);
    private readonly typeParametersWriter = new TypeParametersWriter(this.writer);

    protected writeDefault(def: TypeAliasDefinition, flags: WriteFlags) {
        this.documentationedWriter.write(def);
        this.writeDeclareKeyword(def);
        this.writeExportKeyword(def, flags);
        this.writer.write("type ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.expressionWriter.writeWithEqualsSign(def.type);
        this.writer.write(";").newLine();
    }
}
