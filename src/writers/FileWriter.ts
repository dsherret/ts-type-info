import CodeBlockWriter from "code-block-writer";
import {FileDefinition, ExpressionDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ImportWriter} from "./ImportWriter";
import {ReExportWriter} from "./ReExportWriter";
import {ModuledWriter} from "./ModuledWriter";

// todo: tests

export class FileWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly importWriter: ImportWriter,
        private readonly reExportWriter: ReExportWriter,
        private readonly moduledWriter: ModuledWriter
    ) {
    }

    write(def: FileDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.writeImports(def, flags);
            this.writer.blankLine();
            this.writeReExports(def);
            this.writer.blankLine();
            this.moduledWriter.write(def, flags);
            this.writeDefaultExportExpression(def.defaultExportExpression);
        });
    }

    private writeImports(fileDef: FileDefinition, flags: WriteFlags) {
        fileDef.imports.forEach(importDef => {
            this.importWriter.write(importDef);
            this.writer.newLine();
        });
    }

    private writeReExports(fileDef: FileDefinition) {
        fileDef.reExports.forEach(reExportDef => {
            this.reExportWriter.write(reExportDef);
            this.writer.newLine();
        });
    }

    private writeDefaultExportExpression(expression: ExpressionDefinition | null) {
        if (expression == null)
            return;

        this.writer.blankLine();
        this.writer.write("export default ")
            .write(expression.text)
            .write(";")
            .newLine();
    }
}
