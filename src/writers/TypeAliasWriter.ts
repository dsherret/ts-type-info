import CodeBlockWriter from "code-block-writer";
import {TypeAliasDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ExportableWriter} from "./ExportableWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";

export class TypeAliasWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientableWriter: AmbientableWriter,
        private readonly typeWriter: TypeWriter,
        private readonly typeParametersWriter: TypeParametersWriter) {
    }

    write(def: TypeAliasDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.documentationedWriter.write(def);
            this.exportableWriter.writeExportKeyword(def, flags);
            this.ambientableWriter.writeDeclareKeyword(def);
            this.writer.write("type ").write(def.name);
            this.typeParametersWriter.write(def.typeParameters);
            this.typeWriter.writeWithEqualsSign(def.type, "any");
            this.writer.write(";");
        });
    }
}
