import CodeBlockWriter from "code-block-writer";
import * as definitions from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {PropertyWriter} from "./PropertyWriter";
import {AmbientableWriter} from "./AmbientableWriter";
import {DecoratorsWriter} from "./DecoratorsWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ExportableWriter} from "./ExportableWriter";
import {FunctionWriter} from "./FunctionWriter";
import {ClassConstructorWriter} from "./ClassConstructorWriter";
import {ExtendsImplementsClauseWriter} from "./ExtendsImplementsClauseWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

// todo: tests

export class ClassWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly decoratorsWriter: DecoratorsWriter,
        private readonly exportableWriter: ExportableWriter,
        private readonly ambientableWriter: AmbientableWriter,
        private readonly typeParametersWriter: TypeParametersWriter,
        private readonly propertyWriter: PropertyWriter,
        private readonly methodWriter: FunctionWriter,
        private readonly classConstructorWriter: ClassConstructorWriter,
        private readonly extendsImplementsWriter: ExtendsImplementsClauseWriter,
        private readonly functionBodyWriter: FunctionBodyWriter
    ) {
    }

    write(def: definitions.ClassDefinition, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.writeHeader(def, flags);
            this.writer.block(() => {
                this.writeStaticProperties(def, flags);
                this.writer.blankLine();
                this.writeStaticMethods(def, flags);
                this.writer.blankLine();
                this.writeProperties(def, flags);
                this.writer.blankLine();
                this.writeConstructor(def.constructorDef, flags);
                this.writer.blankLine();
                this.writeMethods(def, flags);
            });
        });
    }

    private writeHeader(def: definitions.ClassDefinition, flags: WriteFlags) {
        this.documentationedWriter.write(def);
        this.decoratorsWriter.write(def, flags);
        this.exportableWriter.writeExportKeyword(def, flags);
        this.ambientableWriter.writeDeclareKeyword(def);
        this.writer.conditionalWrite(def.isAbstract, "abstract ");
        this.writer.write("class ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);

        this.extendsImplementsWriter.writeExtends(def);
        this.extendsImplementsWriter.writeImplements(def);
    }

    private writeConstructor(constructorDef: definitions.ClassConstructorDefinition | null, flags: WriteFlags) {
        if (constructorDef == null || !this.classConstructorWriter.shouldWriteConstructor(constructorDef, flags))
            return;

        const willWriteFunctionBody = this.functionBodyWriter.willWriteFunctionBody(constructorDef, flags);

        if (!willWriteFunctionBody)
            flags |= WriteFlags.HideScopeOnParameters;

        this.classConstructorWriter.write(constructorDef, flags);
        this.writer.newLine();

        // if the function body won't be written, the scoped constructor parameters need to be written out as properties
        if (!willWriteFunctionBody) {
            this.writer.blankLine();
            (constructorDef.parameters || []).filter(p => p.scope !== definitions.ClassConstructorParameterScope.None).forEach(p => {
                this.propertyWriter.write(p.toClassProperty(), flags);
                this.writer.newLine();
            });
        }
    }

    private writeStaticProperties(def: definitions.ClassDefinition, flags: WriteFlags) {
        def.staticProperties.forEach(p => {
            if (!this.shouldInclude(p, flags))
                return;

            this.propertyWriter.write(p, flags);
            this.writer.newLine();
        });
    }

    private writeProperties(def: definitions.ClassDefinition, flags: WriteFlags) {
        def.properties.forEach(p => {
            if (!this.shouldInclude(p, flags) || p.isConstructorParameter)
                return;

            const willWriteAccessorBody = this.propertyWriter.willWriteAccessorBody(p);

            if (willWriteAccessorBody)
                this.writer.blankLine();

            this.propertyWriter.write(p, flags);

            if (willWriteAccessorBody)
                this.writer.blankLine();
            else
                this.writer.newLine();
        });
    }

    private writeStaticMethods(def: definitions.ClassDefinition, flags: WriteFlags) {
        if (def.isAmbient)
            flags = flags | WriteFlags.HideFunctionBodies;

        def.staticMethods.forEach(m => this.writeMethod(m, flags));
    }

    private writeMethods(def: definitions.ClassDefinition, flags: WriteFlags) {
        if (def.isAmbient)
            flags = flags | WriteFlags.HideFunctionBodies;

        def.methods.forEach(m => this.writeMethod(m, flags));
    }

    private writeMethod(def: definitions.ClassMethodDefinition | definitions.ClassStaticMethodDefinition, flags: WriteFlags) {
        if (!this.shouldInclude(def, flags))
            return;

        const thisHasBlankLine = this.functionBodyWriter.willWriteFunctionBody(def, flags);

        if (thisHasBlankLine)
            this.writer.blankLine();

        this.methodWriter.write(def, flags);

        if (thisHasBlankLine)
            this.writer.blankLine();
        else
            this.writer.newLine();
    }

    private shouldInclude(def: definitions.ScopedDefinition, flags: WriteFlags) {
        if (def.scope === definitions.Scope.Private && (flags & WriteFlags.HidePrivateMembers))
            return false;
        else if (def.scope === definitions.Scope.Protected && (flags & WriteFlags.HideProtectedMembers))
            return false;
        else
            return true;
    }
}
