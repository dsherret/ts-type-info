import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition, NamespaceDeclarationType} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ExportableWriter} from "./ExportableWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {ModuledWriter} from "./ModuledWriter";

// todo: tests

export class NamespaceWriter {
    private moduledWriter: ModuledWriter;

    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientableWriter: AmbientableWriter) {
    }

    initialize(moduledWriter: ModuledWriter) {
        // this was the only way I could think of to handle the circular dependency caused by the
        // circular nature of the problem... maybe there's a better way
        this.moduledWriter = moduledWriter;
    }

    write(def: NamespaceDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.documentationedWriter.write(def);
            this.exportableWriter.writeExportKeyword(def, flags);
            this.ambientableWriter.writeDeclareKeyword(def);
            this.writer.write(this.getDeclarationTypeAsString(def.declarationType));
            this.writer.write(` ${def.name}`).block(() => {
                this.moduledWriter.write(def, flags);
            });
        });
    }

    private getDeclarationTypeAsString(declarationType: NamespaceDeclarationType) {
        if (declarationType === NamespaceDeclarationType.Module)
            return "module";

        return "namespace";
    }
}
