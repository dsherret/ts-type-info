import CodeBlockWriter from "code-block-writer";
import {FunctionDefinition, MethodDefinitions, ClassMethodDefinition, ClassStaticMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {CallSignatureWriter} from "./CallSignatureWriter";
import {DecoratorsWriter} from "./DecoratorsWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ParametersWriter} from "./ParametersWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {AsyncableWriter} from "./AsyncableWriter";
import {ExportableWriter} from "./ExportableWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {FunctionReturnTypeWriter} from "./FunctionReturnTypeWriter";
import {ScopeWriter} from "./ScopeWriter";

export class FunctionWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly decoratorsWriter: DecoratorsWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientWriter: AmbientableWriter,
        private readonly asyncableWriter: AsyncableWriter,
        private readonly scopeWriter: ScopeWriter,
        private readonly callSignatureWriter: CallSignatureWriter,
        private readonly typeParametersWriter: TypeParametersWriter,
        private readonly parametersWriter: ParametersWriter,
        private readonly functionBodyWriter: FunctionBodyWriter,
        private readonly functionReturnTypeWriter: FunctionReturnTypeWriter
    ) {
    }

    write(def: FunctionDefinition | MethodDefinitions, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            const shouldWriteImplementation = def.overloadSignatures.length === 0 || (flags & WriteFlags.HideFunctionImplementations) === 0;

            (def.overloadSignatures || []).forEach(s => {
                this.documentationedWriter.write(s);
                this.writeStartOfFunctionHeader(def, flags);
                this.callSignatureWriter.write(s, flags);
                this.writer.write(";").newLine();
            });

            // todo: look at this more
            if ((def as FunctionDefinition).isAmbient && def.overloadSignatures.length > 0)
                return;

            if (shouldWriteImplementation) {
                this.documentationedWriter.write(def);
                this.decoratorsWriter.write(def as ClassMethodDefinition, flags);
                this.writeImplementation(def, flags);
            }
        });
    }

    private writeImplementation(def: FunctionDefinition | MethodDefinitions, flags: WriteFlags) {
        this.writeStartOfFunctionHeader(def, flags);
        this.typeParametersWriter.write(def.typeParameters);
        this.parametersWriter.write(def, flags);
        this.functionReturnTypeWriter.write(def, flags);
        this.functionBodyWriter.write(def, flags);
    }

    private writeStartOfFunctionHeader(def: FunctionDefinition | MethodDefinitions, flags: WriteFlags) {
        if (def instanceof FunctionDefinition) {
            this.exportableWriter.writeExportKeyword(def, flags);
            this.ambientWriter.writeDeclareKeyword(def);
        }
        else {
            this.scopeWriter.writeScope((def as ClassMethodDefinition).scope);
            this.writeStatic(def);
            this.writeAbstract(def as ClassMethodDefinition);
        }

        this.asyncableWriter.writeAsyncKeyword(def as FunctionDefinition);
        this.writer.conditionalWrite(def instanceof FunctionDefinition, "function");
        this.writer.conditionalWrite(def.isGenerator, "*");
        this.writer.conditionalWrite(def instanceof FunctionDefinition, " ");
        this.writer.write(def.name);
    }

    private writeStatic(def: MethodDefinitions) {
        if (def instanceof ClassStaticMethodDefinition)
            this.writer.write("static ");
    }

    private writeAbstract(def: ClassMethodDefinition) {
        if (def.isAbstract)
            this.writer.write("abstract ");
    }
}
