import {ClassConstructorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {ScopeWriter} from "./ScopeWriter";

export class ClassConstructorWriter extends BaseDefinitionWriter<ClassConstructorDefinition> {
    private readonly documentationedWriter = new DocumentationedWriter(this.writer);
    private readonly parametersWriter = new ParametersWriter(this.writer);
    private readonly functionBodyWriter = new FunctionBodyWriter(this.writer);
    private readonly scopeWriter = new ScopeWriter(this.writer);

    static shouldWriteConstructor(def: ClassConstructorDefinition, flags: WriteFlags) {
        return (def.parameters.length > 0 || FunctionBodyWriter.willWriteFunctionBody(def, flags) || flags & WriteFlags.HideFunctionBodies);
    }

    protected writeDefault(def: ClassConstructorDefinition, flags: WriteFlags) {
        this.documentationedWriter.write(def);
        def.overloadSignatures.forEach(signatureDef => {
            this.writeStartOfConstructor(def);
            this.parametersWriter.write(signatureDef, flags);
            this.writer.write(";").newLine();
        });
        this.writeStartOfConstructor(def);
        this.parametersWriter.write(def, flags);
        this.functionBodyWriter.write(def, flags);
    }

    private writeStartOfConstructor(def: ClassConstructorDefinition) {
        this.scopeWriter.write(def.scope);
        this.writer.spaceIfLastNotSpace();
        this.writer.write("constructor");
    }
}
