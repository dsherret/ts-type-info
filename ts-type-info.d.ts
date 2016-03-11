/// <reference path="node_modules/code-block-writer/code-block-writer.d.ts" />

declare module TsTypeInfo {
    function getInfoFromFiles(fileNames: string[], options?: Options): ArrayExt<FileDefinition>;

    function getInfoFromString(code: string, options?: Options): FileDefinition;

    interface Options {
        compilerOptions?: CompilerOptions;
        showDebugMessages?: boolean;
    }

    interface CompilerOptions {
        allowNonTsExtensions?: boolean;
        charset?: string;
        locale?: string;
        project?: string;
        rootDir?: string;
    }

    class ArrayExt<T> extends Array<T> {
        constructor(...items: T[]);

        firstOrDefault(condition: (item: T) => boolean): T;
        removeWhere(condition: (item: T) => boolean): void;
    }

    type AllDefinitions = FileDefinition | ClassDefinition | ClassMethodDefinition | ClassMethodParameterDefinition | ClassPropertyDefinition | ClassConstructorDefinition | ClassConstructorParameterDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassStaticMethodParameterDefinition | InterfaceDefinition | InterfaceMethodParameterDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition | InterfaceNewSignatureParameterDefinition | EnumDefinition | EnumMemberDefinition | CallSignatureDefinition | CallSignatureParameterDefinition | FunctionDefinition | FunctionParameterDefinition | TypeParameterDefinition<ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | TypeAliasDefinition> | TypePropertyDefinition | DecoratorDefinition<ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassMethodParameterDefinition | ClassConstructorParameterDefinition> | TypeAliasDefinition | NamespaceDefinition | VariableDefinition;

    type ClassDefinitions = ClassDefinition | ClassMethodDefinition | ClassMethodParameterDefinition | ClassPropertyDefinition | ClassConstructorDefinition | ClassConstructorParameterDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassStaticMethodParameterDefinition;

    type InterfaceDefinitions = InterfaceDefinition | InterfaceMethodParameterDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition | InterfaceNewSignatureParameterDefinition;

    type EnumDefinitions = EnumDefinition | EnumMemberDefinition;

    type FunctionDefinitions = CallSignatureDefinition | CallSignatureParameterDefinition | FunctionDefinition | FunctionParameterDefinition;

    type NamespaceDefinitions = NamespaceDefinition;

    type GeneralDefinitions = TypeParameterDefinition<ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | TypeAliasDefinition> | TypePropertyDefinition | DecoratorDefinition<ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassMethodParameterDefinition | ClassConstructorParameterDefinition> | TypeAliasDefinition;

    type VariableDefinitions = VariableDefinition;

    type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassMethodParameterDefinition | ClassConstructorParameterDefinition;

    type TypeParameteredDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | TypeAliasDefinition;

    type ModuledDefinitions = FileDefinition | NamespaceDefinition;

    type WriteableDefinitions = FileDefinition | NamespaceDefinition | ClassDefinition | InterfaceDefinition | FunctionDefinition | EnumDefinition | VariableDefinition | TypeAliasDefinition;

    type ExportableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

    type BaseFunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

    type FunctionWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

    type FunctionBodyWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

    type MainDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

    type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;

    type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;

    type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition | InterfaceNewSignatureParameterDefinition | ClassConstructorParameterDefinition | CallSignatureParameterDefinition;

    type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | InterfaceNewSignatureDefinition | ClassConstructorDefinition | CallSignatureDefinition;

    type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;

    type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;

    type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;

    abstract class BaseDefinition {
        onBeforeWrite: (writer: CodeBlockWriter) => void;
        onAfterWrite: (writer: CodeBlockWriter) => void;

        isClassDefinition(): this is ClassDefinition;
        isClassMethodDefinition(): this is ClassMethodDefinition;
        isClassPropertyDefinition(): this is ClassPropertyDefinition;
        isClassStaticMethodDefinition(): this is ClassStaticMethodDefinition;
        isClassStaticPropertyDefinition(): this is ClassStaticPropertyDefinition;
        isClassConstructorDefinition(): this is ClassConstructorDefinition;
        isInterfaceDefinition(): this is InterfaceDefinition;
        isInterfaceMethodDefinition(): this is InterfaceMethodDefinition;
        isInterfaceNewSignatureDefinition(): this is InterfaceNewSignatureDefinition;
        isInterfacePropertyDefinition(): this is InterfacePropertyDefinition;
        isEnumDefinition(): this is EnumDefinition;
        isFunctionDefinition(): this is FunctionDefinition;
        isFileDefinition(): this is FileDefinition;
        isNamespaceDefinition(): this is NamespaceDefinition;
        isTypeAliasDefinition(): this is TypeAliasDefinition;
        isVariableDefinition(): this is VariableDefinition;
    }

    enum DefinitionType {
        File = 1,
        Import = 2,
        ReExport = 3,
        Class = 100,
        ClassConstructor = 101,
        ClassConstructorParameter = 102,
        ClassMethod = 103,
        ClassMethodParameter = 104,
        ClassStaticMethod = 105,
        ClassStaticMethodParameter = 106,
        ClassProperty = 107,
        ClassStaticProperty = 108,
        Interface = 200,
        InterfaceMethod = 201,
        InterfaceMethodParameter = 202,
        InterfaceProperty = 203,
        InterfaceNewSignature = 204,
        InterfaceNewSignatureParameter = 205,
        Namespace = 300,
        Function = 400,
        FunctionParameter = 401,
        Variable = 500,
        Enum = 600,
        EnumMember = 601,
        CallSignature = 700,
        CallSignatureParameter = 701,
        Decorator = 800,
        TypeAlias = 900,
        TypeParameter = 1000,
        TypeProperty = 1100
    }

    interface IBaseNamedDefinition {
        name: string;
    }

    interface INamedDefinition extends IBaseNamedDefinition {
    }

    abstract class NamedDefinition implements INamedDefinition {
        name: string;
    }

    interface IParentedDefinition<ParentType> {
        parent: ParentType;
    }

    interface IAbstractableDefinition {
        isAbstract: boolean;
    }

    abstract class AbstractableDefinition implements IAbstractableDefinition {
        isAbstract: boolean;
    }

    interface IAmbientableDefinition {
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
    }

    abstract class AmbientableDefinition implements IAmbientableDefinition {
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
    }

    interface ITypeExpressionedDefinition {
        typeExpression: TypeExpression;
    }

    abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
        typeExpression: TypeExpression;
    }

    interface IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    interface IDecoratableDefinition {
        decorators: ArrayExt<DecoratorDefinition<this>>;
    }

    abstract class DecoratableDefinition implements IDecoratableDefinition {
        decorators: ArrayExt<DecoratorDefinition<this>>;
    }

    interface IExportableDefinition {
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
    }

    abstract class ExportableDefinition implements IExportableDefinition {
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
    }

    interface IModuledDefinition {
        namespaces: ArrayExt<NamespaceDefinition>;
        classes: ArrayExt<ClassDefinition>;
        interfaces: ArrayExt<InterfaceDefinition>;
        enums: ArrayExt<EnumDefinition>;
        functions: ArrayExt<FunctionDefinition>;
        variables: ArrayExt<VariableDefinition>;
        typeAliases: ArrayExt<TypeAliasDefinition>;
        exports: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;
    }

    abstract class ModuledDefinition implements IModuledDefinition {
        namespaces: ArrayExt<NamespaceDefinition>;
        classes: ArrayExt<ClassDefinition>;
        interfaces: ArrayExt<InterfaceDefinition>;
        enums: ArrayExt<EnumDefinition>;
        functions: ArrayExt<FunctionDefinition>;
        variables: ArrayExt<VariableDefinition>;
        typeAliases: ArrayExt<TypeAliasDefinition>;
        exports: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;
    }

    class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
        isOptional: boolean;
        name: string;
        parent: ParentType;
        typeExpression: TypeExpression;
    }

    interface ITypeParameteredDefinition {
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    }

    abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    }

    abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    class BaseFunctionDefinition<ParentType, ParameterType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition, IParameteredDefinition<ParameterType>, IReturnTypedDefinition {
        name: string;
        parent: ParentType;
        parameters: ArrayExt<ParameterType>;
        returnTypeExpression: TypeExpression;
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    }

    interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
    }

    class BaseParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
        isOptional: boolean;
        isRestParameter: boolean;
        name: string;
        parent: ParentType;
        typeExpression: TypeExpression;
        defaultExpression: Expression;
    }

    interface IParameteredDefinition<ParameterType> {
        parameters: ArrayExt<ParameterType>;
    }

    abstract class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
        parameters: ArrayExt<ParameterType>;
    }

    interface IReturnTypedDefinition {
        returnTypeExpression: TypeExpression;
    }

    abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
        returnTypeExpression: TypeExpression;
    }

    class TypeParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType> {
        constraintTypeExpression: TypeExpression;
        name: string;
        parent: ParentType;
    }

    class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    }

    class TypeAliasDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeExpressionedDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        typeExpression: TypeExpression;
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class DecoratorDefinition<ParentType> extends BaseDefinition implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
        arguments: ArrayExt<Expression>;
        name: string;
        parent: ParentType;
    }

    class CallSignatureDefinition extends BaseDefinition implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
        minArgumentCount: number;
        parameters: ArrayExt<CallSignatureParameterDefinition>;
        returnTypeExpression: TypeExpression;
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    }

    class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    }

    class FunctionDefinition extends BaseFunctionDefinition<FileDefinition | NamespaceDefinition, FunctionParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
        onWriteFunctionBody: (writer: CodeBlockWriter) => void;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    }

    class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
        decorators: ArrayExt<DecoratorDefinition<this>>;
    }

    class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements IDecoratableDefinition, IScopedDefinition {
        onWriteFunctionBody: (writer: CodeBlockWriter) => void;
        decorators: ArrayExt<DecoratorDefinition<this>>;
        scope: "public" | "protected" | "private";
    }

    class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
        decorators: ArrayExt<DecoratorDefinition<this>>;
        scope: "public" | "protected" | "private";
    }

    interface IScopedDefinition {
        scope: "public" | "protected" | "private";
    }

    abstract class ScopedDefinition implements IScopedDefinition {
        scope: "public" | "protected" | "private";
    }

    class ClassDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IDecoratableDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition, IAbstractableDefinition {
        methods: ArrayExt<ClassMethodDefinition>;
        properties: ArrayExt<ClassPropertyDefinition>;
        staticMethods: ArrayExt<ClassStaticMethodDefinition>;
        staticProperties: ArrayExt<ClassStaticPropertyDefinition>;
        constructorDef: ClassConstructorDefinition;
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
        extendsTypeExpressions: ArrayExt<TypeExpression>;
        implementsTypeExpressions: ArrayExt<TypeExpression>;
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        decorators: ArrayExt<DecoratorDefinition<this>>;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
        isAbstract: boolean;

        write(): string;
    }

    class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
        isAbstract: boolean;
    }

    class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    }

    class ClassPropertyDefinition extends BaseClassPropertyDefinition {
        isAccessor: boolean;
        isReadonly: boolean;
    }

    class ClassConstructorDefinition extends BaseDefinition implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
        onWriteFunctionBody: (writer: CodeBlockWriter) => void;
        parent: ClassDefinition;
        parameters: ArrayExt<ClassConstructorParameterDefinition>;
    }

    class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
        decorators: ArrayExt<DecoratorDefinition<this>>;
    }

    class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    }

    class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    }

    class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    }

    type Scope = "public" | "protected" | "private";

    const Scope: { Public: "public" | "protected" | "private"; Protected: "public" | "protected" | "private"; Private: "public" | "protected" | "private"; };

    class InterfaceDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        methods: ArrayExt<InterfaceMethodDefinition>;
        newSignatures: ArrayExt<InterfaceNewSignatureDefinition>;
        properties: ArrayExt<InterfacePropertyDefinition>;
        typeParameters: ArrayExt<TypeParameterDefinition<this>>;
        extendsTypeExpressions: ArrayExt<TypeExpression>;
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    }

    class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    }

    class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    }

    class InterfaceNewSignatureDefinition extends BaseDefinition implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition, IParentedDefinition<InterfaceDefinition> {
        parent: InterfaceDefinition;
        parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
        returnTypeExpression: TypeExpression;
    }

    class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    }

    class EnumDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, IAmbientableDefinition {
        members: ArrayExt<EnumMemberDefinition>;
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
        value: number;
        name: string;
        parent: EnumDefinition;
    }

    type NamespaceDeclarationType = "namespace" | "module";

    const NamespaceDeclarationType: { Namespace: "namespace" | "module"; Module: "namespace" | "module"; };

    class NamespaceDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, IModuledDefinition, IAmbientableDefinition {
        declarationType: "namespace" | "module";
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        namespaces: ArrayExt<NamespaceDefinition>;
        classes: ArrayExt<ClassDefinition>;
        interfaces: ArrayExt<InterfaceDefinition>;
        enums: ArrayExt<EnumDefinition>;
        functions: ArrayExt<FunctionDefinition>;
        variables: ArrayExt<VariableDefinition>;
        exports: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;
        typeAliases: ArrayExt<TypeAliasDefinition>;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class FileDefinition extends BaseDefinition implements IModuledDefinition {
        fileName: string;
        imports: ArrayExt<ImportDefinition>;
        reExports: ArrayExt<ReExportDefinition>;
        defaultExport: Expression | ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;
        namespaces: ArrayExt<NamespaceDefinition>;
        classes: ArrayExt<ClassDefinition>;
        interfaces: ArrayExt<InterfaceDefinition>;
        enums: ArrayExt<EnumDefinition>;
        functions: ArrayExt<FunctionDefinition>;
        variables: ArrayExt<VariableDefinition>;
        typeAliases: ArrayExt<TypeAliasDefinition>;
        exports: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;

        write(): string;
        writeExportsAsDefinitionFile(options: { definitionName: string; moduleName: string; referencePaths: string[]; }): string;
    }

    class ImportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
        parent: FileDefinition;
    }

    class ReExportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
        parent: FileDefinition;
    }

    class VariableDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition {
        declarationType: "var" | "let" | "const";
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        typeExpression: TypeExpression;
        defaultExpression: Expression;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    type VariableDeclarationType = "var" | "let" | "const";

    const VariableDeclarationType: { Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; };

    class Expression {
        text: string;
    }

    class Type {
        callSignatures: ArrayExt<CallSignatureDefinition>;
        definitions: ArrayExt<IBaseNamedDefinition>;
        properties: ArrayExt<TypePropertyDefinition>;
        typeArguments: ArrayExt<TypeExpression>;
        text: string;
    }

    class TypeExpression {
        text: string;
        types: ArrayExt<Type>;
    }
}

declare module "ts-type-info" {
    export = TsTypeInfo;
}
