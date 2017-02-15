import CodeBlockWriter from "code-block-writer";
import {VariableDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {ExportableWriter} from "./ExportableWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";
import {VariableDeclarationTypeWriter} from "./VariableDeclarationTypeWriter";

export class VariableWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientableWriter: AmbientableWriter,
        private readonly typeWithDefaultExpressionWriter: TypeWithDefaultExpressionWriter,
        private readonly variableDeclarationTypeWriter: VariableDeclarationTypeWriter
    ) {
    }

    write(def: VariableDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.documentationedWriter.write(def);
            this.exportableWriter.writeExportKeyword(def, flags);
            this.ambientableWriter.writeDeclareKeyword(def);
            this.variableDeclarationTypeWriter.writeDeclarationType(def.declarationType);
            this.writer.spaceIfLastNotSpace().write(def.name);
            this.typeWithDefaultExpressionWriter.write(def, flags, "any");
            this.writer.write(";");
        });
    }
}
