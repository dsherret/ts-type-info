import {FileDefinition, ExpressionDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ImportWriter} from "./ImportWriter";
import {ReExportWriter} from "./ReExportWriter";
import {ModuledWriter} from "./ModuledWriter";

export class FileWriter extends BaseDefinitionWriter<FileDefinition> {
    private importWriter = new ImportWriter(this.writer);
    private reExportWriter = new ReExportWriter(this.writer);
    private moduledWriter = new ModuledWriter(this.writer);

    protected writeDefault(def: FileDefinition, flags: WriteFlags) {
        this.writeImports(def, flags);
        this.writer.newLine();
        this.writeReExports(def, flags);
        this.writer.newLine();
        this.moduledWriter.write(def, flags);
        this.writeDefaultExportExpression(def.defaultExportExpression);
    }

    private writeImports(fileDef: FileDefinition, flags: WriteFlags) {
        fileDef.imports.forEach(importDef => {
            this.importWriter.write(importDef, flags);
        });
    }

    private writeReExports(fileDef: FileDefinition, flags: WriteFlags) {
        fileDef.reExports.forEach(reExportDef => {
            this.reExportWriter.write(reExportDef, flags);
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
