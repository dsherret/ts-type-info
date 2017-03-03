import CodeBlockWriter from "code-block-writer";
import * as writers from "./../writers";
import {Memoize} from "./../utils";

export class WriterFactory {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    @Memoize
    getBaseDefinitionWriter() {
        return new writers.BaseDefinitionWriter(this.writer);
    }

    @Memoize
    getAmbientableWriter() {
        return new writers.AmbientableWriter(this.writer);
    }

    @Memoize
    getAsyncableWriter() {
        return new writers.AsyncableWriter(this.writer);
    }

    @Memoize
    getCallSignatureWriter() {
        return new writers.CallSignatureWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getTypeParametersWriter(),
            this.getTypeWriter(),
            this.getParametersWriter(),
            this.getUserDefinedTypeGuardWriter());
    }

    @Memoize
    getClassConstructorParameterScopeWriter() {
        return new writers.ClassConstructorParameterScopeWriter(this.writer);
    }

    @Memoize
    getClassConstructorWriter() {
        return new writers.ClassConstructorWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getParametersWriter(),
            this.getFunctionBodyWriter(),
            this.getScopeWriter());
    }

    @Memoize
    getClassWriter() {
        return new writers.ClassWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getDecoratorsWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter(),
            this.getTypeParametersWriter(),
            this.getPropertyWriter(),
            this.getFunctionWriter(),
            this.getClassConstructorWriter(),
            this.getExtendsImplementsClauseWriter(),
            this.getFunctionBodyWriter());
    }

    @Memoize
    getDecoratorWriter() {
        return new writers.DecoratorWriter(this.writer, this.getBaseDefinitionWriter());
    }

    @Memoize
    getDecoratorsWriter() {
        return new writers.DecoratorsWriter(this.writer, this.getDecoratorWriter());
    }

    @Memoize
    getDefaultExpressionedWriter() {
        return new writers.DefaultExpressionedWriter(this.writer, this.getExpressionWriter());
    }

    @Memoize
    getDocumentationedWriter() {
        return new writers.DocumentationedWriter(this.writer);
    }

    @Memoize
    getEnumWriter() {
        return new writers.EnumWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter(),
            this.getEnumMemberWriter());
    }

    @Memoize
    getEnumMemberWriter() {
        return new writers.EnumMemberWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter());
    }

    @Memoize
    getExportableWriter() {
        return new writers.ExportableWriter(this.writer);
    }

    @Memoize
    getExpressionWriter() {
        return new writers.ExpressionWriter(this.writer);
    }

    @Memoize
    getExtendsImplementsClauseWriter() {
        return new writers.ExtendsImplementsClauseWriter(this.writer);
    }

    @Memoize
    getFunctionBodyWriter() {
        return new writers.FunctionBodyWriter(this.writer);
    }

    @Memoize
    getFunctionReturnTypeWriter() {
        return new writers.FunctionReturnTypeWriter(this.writer, this.getFunctionBodyWriter(), this.getTypeWriter());
    }

    @Memoize
    getFileWriter() {
        return new writers.FileWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getImportWriter(),
            this.getReExportWriter(),
            this.getModuledWriter());
    }

    @Memoize
    getFunctionWriter() {
        return new writers.FunctionWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getDecoratorsWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter(),
            this.getAsyncableWriter(),
            this.getScopeWriter(),
            this.getCallSignatureWriter(),
            this.getTypeParametersWriter(),
            this.getParametersWriter(),
            this.getFunctionBodyWriter(),
            this.getFunctionReturnTypeWriter());
    }

    @Memoize
    getImportWriter() {
        return new writers.ImportWriter(this.writer, this.getBaseDefinitionWriter());
    }

    @Memoize
    getIndexSignatureWriter() {
        return new writers.IndexSignatureWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getTypeWriter());
    }

    @Memoize
    getInterfaceWriter() {
        return new writers.InterfaceWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter(),
            this.getTypeParametersWriter(),
            this.getPropertyWriter(),
            this.getFunctionWriter(),
            this.getCallSignatureWriter(),
            this.getIndexSignatureWriter(),
            this.getExtendsImplementsClauseWriter());
    }

    @Memoize
    getModuledWriter() {
        return this.getNamespaceAndModuledWriterPrivate().moduledWriter;
    }

    @Memoize
    getNamedImportPartWriter() {
        return new writers.NamedImportPartWriter(this.writer, this.getBaseDefinitionWriter());
    }

    @Memoize
    getNamedImportPartsWriter() {
        return new writers.NamedImportPartsWriter(this.writer, this.getNamedImportPartWriter());
    }

    @Memoize
    getNamespaceWriter() {
        return this.getNamespaceAndModuledWriterPrivate().namespaceWriter;
    }

    @Memoize
    getParametersWriter() {
        return new writers.ParametersWriter(
            this.writer,
            this.getParameterWriter(),
            this.getParameterWithDestructuringWriter(),
            this.getTypeWriter());
    }

    @Memoize
    getParameterWriter() {
        return new writers.ParameterWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDecoratorsWriter(),
            this.getTypeWithDefaultExpressionWriter(),
            this.getClassConstructorParameterScopeWriter());
    }

    @Memoize
    getParameterWithDestructuringWriter() {
        return new writers.ParameterWithDestructuringWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDefaultExpressionedWriter(),
            this.getTypeWriter());
    }

    @Memoize
    getPropertyWriter() {
        return new writers.PropertyWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getDecoratorsWriter(),
            this.getTypeWriter(),
            this.getScopeWriter(),
            this.getTypeWithDefaultExpressionWriter());
    }

    @Memoize
    getReExportWriter() {
        return new writers.ReExportWriter(this.writer, this.getBaseDefinitionWriter(), this.getNamedImportPartsWriter());
    }

    @Memoize
    getScopeWriter() {
        return new writers.ScopeWriter(this.writer);
    }

    @Memoize
    getTypeAliasWriter() {
        return new writers.TypeAliasWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter(),
            this.getTypeWriter(),
            this.getTypeParametersWriter());
    }

    @Memoize
    getTypeWithDefaultExpressionWriter() {
        return new writers.TypeWithDefaultExpressionWriter(this.writer, this.getTypeWriter(), this.getDefaultExpressionedWriter());
    }

    @Memoize
    getTypeParameterWriter() {
        return new writers.TypeParameterWriter(this.writer, this.getBaseDefinitionWriter(), this.getTypeWriter());
    }

    @Memoize
    getTypeParametersWriter() {
        return new writers.TypeParametersWriter(this.writer, this.getTypeParameterWriter());
    }

    @Memoize
    getTypeWriter() {
        return new writers.TypeWriter(this.writer);
    }

    @Memoize
    getVariableDeclarationWriter() {
        return new writers.VariableDeclarationTypeWriter(this.writer);
    }

    @Memoize
    getVariableWriter() {
        return new writers.VariableWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter(),
            this.getTypeWithDefaultExpressionWriter(),
            this.getVariableDeclarationWriter());
    }

    @Memoize
    getUserDefinedTypeGuardWriter() {
        return new writers.UserDefinedTypeGuardWriter(this.writer);
    }

    @Memoize
    private getNamespaceAndModuledWriterPrivate() {
        const moduledWriter = new writers.ModuledWriter(
            this.writer,
            this.getInterfaceWriter(),
            this.getClassWriter(),
            this.getEnumWriter(),
            this.getFunctionWriter(),
            this.getVariableWriter(),
            this.getTypeAliasWriter());
        const namespaceWriter = new writers.NamespaceWriter(
            this.writer,
            this.getBaseDefinitionWriter(),
            this.getDocumentationedWriter(),
            this.getExportableWriter(),
            this.getAmbientableWriter());

        namespaceWriter.initialize(moduledWriter);
        moduledWriter.initialize(namespaceWriter);

        return {moduledWriter, namespaceWriter};
    }
}
