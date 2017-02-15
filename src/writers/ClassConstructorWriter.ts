import CodeBlockWriter from "code-block-writer";
import {ClassConstructorDefinition, Scope} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {ParametersWriter} from "./ParametersWriter";
import {ScopeWriter} from "./ScopeWriter";

export class ClassConstructorWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly parametersWriter: ParametersWriter,
        private readonly functionBodyWriter: FunctionBodyWriter,
        private readonly scopeWriter: ScopeWriter
    ) {
    }

    shouldWriteConstructor(def: ClassConstructorDefinition, flags: WriteFlags) {
        const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
        return (def.scope !== Scope.Public || def.parameters.length > 0 || isOnWriteFunctionBodyDefined);
    }

    write(def: ClassConstructorDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            def.overloadSignatures.forEach(signatureDef => {
                this.writeStartOfConstructor(def);
                this.parametersWriter.write(signatureDef, flags);
                this.writer.write(";").newLine();
            });
            this.writeStartOfConstructor(def);
            this.parametersWriter.write(def, flags);
            this.functionBodyWriter.write(def, flags);
        });
    }

    private writeStartOfConstructor(def: ClassConstructorDefinition) {
        this.documentationedWriter.write(def);
        this.scopeWriter.writeScope(def.scope);
        this.writer.write("constructor");
    }
}
