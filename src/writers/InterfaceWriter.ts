import CodeBlockWriter from "code-block-writer";
import {InterfaceDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {PropertyWriter} from "./PropertyWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {FunctionWriter} from "./FunctionWriter";
import {CallSignatureWriter} from "./CallSignatureWriter";
import {IndexSignatureWriter} from "./IndexSignatureWriter";
import {ExtendsImplementsClauseWriter} from "./ExtendsImplementsClauseWriter";
import {ExportableWriter} from "./ExportableWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";

export class InterfaceWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientableWriter: AmbientableWriter,
        private readonly typeParametersWriter: TypeParametersWriter,
        private readonly propertyWriter: PropertyWriter,
        private readonly methodWriter: FunctionWriter,
        private readonly callSignatureWriter: CallSignatureWriter,
        private readonly indexSignatureWriter: IndexSignatureWriter,
        private readonly extendsImplementsWriter: ExtendsImplementsClauseWriter
    ) {
    }

    write(def: InterfaceDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.writeHeader(def, flags);
            this.writer.block(() => {
                this.writeNewSignatures(def, flags);
                this.writer.blankLine();
                this.writeCallSignatures(def, flags);
                this.writer.blankLine();
                this.writeIndexSignatures(def);
                this.writer.blankLine();
                this.writeProperties(def, flags);
                this.writer.blankLine();
                this.writeMethods(def, flags);
            });
        });
    }

    private writeHeader(def: InterfaceDefinition, flags: WriteFlags) {
        this.documentationedWriter.write(def);
        this.exportableWriter.writeExportKeyword(def, flags);
        this.ambientableWriter.writeDeclareKeyword(def);
        this.writer.write("interface ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);
        this.extendsImplementsWriter.writeExtends(def);
    }

    private writeNewSignatures(def: InterfaceDefinition, flags: WriteFlags) {
        def.newSignatures.forEach(n => {
            this.writer.write("new");
            this.callSignatureWriter.write(n, flags);
            this.writer.write(";").newLine();
        });
    }

    private writeCallSignatures(def: InterfaceDefinition, flags: WriteFlags) {
        def.callSignatures.forEach(c => {
            this.callSignatureWriter.write(c, flags);
            this.writer.write(";").newLine();
        });
    }

    private writeIndexSignatures(def: InterfaceDefinition) {
        def.indexSignatures.forEach(s => {
            this.indexSignatureWriter.write(s);
            this.writer.write(";").newLine();
        });
    }

    private writeProperties(def: InterfaceDefinition, flags: WriteFlags) {
        def.properties.forEach(p => {
            this.propertyWriter.write(p, flags);
            this.writer.newLine();
        });
    }

    private writeMethods(def: InterfaceDefinition, flags: WriteFlags) {
        def.methods.forEach(m => {
            this.methodWriter.write(m, flags);
            this.writer.newLine();
        });
    }
}
