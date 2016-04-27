import {FileDefinition, ExpressionDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ImportWriter} from "./ImportWriter";
import {ModuledWriter} from "./ModuledWriter";
import {VariableWriter} from "./VariableWriter";

export class FileWriter extends BaseDefinitionWriter<FileDefinition> {
    private importWriter = new ImportWriter(this.writer);
    private moduledWriter = new ModuledWriter(this.writer);
    private variableWriter = new VariableWriter(this.writer);

    protected writeDefault(def: FileDefinition, flags: WriteFlags) {
        this.writeImports(def, flags);
        this.writer.newLine();
        this.writeVariables(def, flags);
        this.moduledWriter.write(def, flags);
        this.writeDefaultExportExpression(def.defaultExportExpression);
    }

    private writeImports(fileDef: FileDefinition, flags: WriteFlags) {
        fileDef.imports.forEach(importDef => {
            this.importWriter.write(importDef, flags);
        });
    }

    private writeVariables(fileDef: FileDefinition, flags: WriteFlags) {
        fileDef.variables.forEach(variableDef => {
            this.variableWriter.write(variableDef, flags);
        });
    }

    private writeDefaultExportExpression(expression: ExpressionDefinition) {
        if (expression != null) {
            this.writer.newLine();
            this.writer.write("export default ")
                .write(expression.text)
                .write(";")
                .newLine();
        }
    }
}
