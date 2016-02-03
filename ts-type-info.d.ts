declare module TsTypeInfo {
    function getFileInfo(fileNames: string[], options?: Options): FileDefinition[];

    function getStringInfo(code: string, options?: Options): FileDefinition;

    interface Options {
        compilerOptions?: CompilerOptions;
    }

    interface CompilerOptions {
        allowNonTsExtensions?: boolean;
        charset?: string;
        locale?: string;
        project?: string;
        rootDir?: string;
    }

    interface IBaseNamedDefinition {
        name: string;
    }

    interface INamedDefinition extends IBaseNamedDefinition {
    }

    class NamedDefinition implements INamedDefinition {
        name: string;
    }

    interface IParentedDefinition<ParentType> {
        parent: ParentType;
    }

    interface IAmbientableDefinition {
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
    }

    class AmbientableDefinition implements IAmbientableDefinition {
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
    }

    interface ITypeExpressionedDefinition {
        typeExpression: TypeExpression;
    }

    class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
        typeExpression: TypeExpression;
    }

    interface IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    interface IDecoratableDefinition {
        decorators: DecoratorDefinition<this>[];
    }

    class DecoratableDefinition implements IDecoratableDefinition {
        decorators: DecoratorDefinition<this>[];
    }

    interface IExportableDefinition {
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
    }

    class ExportableDefinition implements IExportableDefinition {
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
    }

    interface IModuledDefinition {
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        typeAliases: TypeAliasDefinition[];
        exports: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    }

    class ModuledDefinition implements IModuledDefinition {
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        typeAliases: TypeAliasDefinition[];
        exports: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    }

    class BasePropertyDefinition<ParentType> implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
        isOptional: boolean;
        name: string;
        parent: ParentType;
        typeExpression: TypeExpression;
    }

    interface ITypeParameteredDefinition {
        typeParameters: TypeParameterDefinition<this>[];
    }

    class TypeParameteredDefinition implements ITypeParameteredDefinition {
        typeParameters: TypeParameterDefinition<this>[];
    }

    class TypeParameterDefinition<ParentType> implements INamedDefinition, IParentedDefinition<ParentType> {
        constraintTypeExpression: TypeExpression;
        name: string;
        parent: ParentType;
    }

    class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    }

    class TypeAliasDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeExpressionedDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        typeExpression: TypeExpression;
        typeParameters: TypeParameterDefinition<this>[];
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    class DecoratorDefinition<ParentType> implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
        arguments: Expression[];
        name: string;
        parent: ParentType;
    }

    class BaseFunctionDefinition<ParentType, ParameterType> implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition, IParameteredDefinition<ParameterType>, IReturnTypedDefinition {
        name: string;
        parent: ParentType;
        parameters: ParameterType[];
        returnTypeExpression: TypeExpression;
        typeParameters: TypeParameterDefinition<this>[];
    }

    interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
    }

    class BaseParameterDefinition<ParentType> implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
        isOptional: boolean;
        isRestParameter: boolean;
        name: string;
        parent: ParentType;
        typeExpression: TypeExpression;
        defaultExpression: Expression;
    }

    interface IParameteredDefinition<ParameterType> {
        parameters: ParameterType[];
    }

    class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
        parameters: ParameterType[];
    }

    interface IReturnTypedDefinition {
        returnTypeExpression: TypeExpression;
    }

    class ReturnTypedDefinition implements IReturnTypedDefinition {
        returnTypeExpression: TypeExpression;
    }

    class CallSignatureDefinition implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
        minArgumentCount: number;
        parameters: CallSignatureParameterDefinition[];
        returnTypeExpression: TypeExpression;
        typeParameters: TypeParameterDefinition<this>[];
    }

    class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    }

    class FunctionDefinition extends BaseFunctionDefinition<FileDefinition | NamespaceDefinition, FunctionParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
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
        decorators: DecoratorDefinition<this>[];
    }

    class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements IDecoratableDefinition, IScopedDefinition {
        decorators: DecoratorDefinition<this>[];
        scope: Scope;
    }

    class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
        decorators: DecoratorDefinition<this>[];
        scope: Scope;
    }

    interface IScopedDefinition {
        scope: Scope;
    }

    class ScopedDefinition implements IScopedDefinition {
        scope: Scope;
    }

    class ClassDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IDecoratableDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        isAbstract: boolean;
        methods: ClassMethodDefinition[];
        properties: ClassPropertyDefinition[];
        staticMethods: ClassStaticMethodDefinition[];
        staticProperties: ClassStaticPropertyDefinition[];
        constructorDef: ConstructorDefinition;
        typeParameters: TypeParameterDefinition<this>[];
        extendsTypeExpressions: TypeExpression[];
        implementsTypeExpressions: TypeExpression[];
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        decorators: DecoratorDefinition<this>[];
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> {
    }

    class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    }

    class ClassPropertyDefinition extends BaseClassPropertyDefinition {
        isAccessor: boolean;
        isReadonly: boolean;
    }

    class ConstructorDefinition implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ConstructorParameterDefinition> {
        parent: ClassDefinition;
        parameters: ConstructorParameterDefinition[];
    }

    class ConstructorParameterDefinition extends BaseParameterDefinition<ConstructorDefinition> implements IDecoratableDefinition {
        decorators: DecoratorDefinition<this>[];
    }

    class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    }

    class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    }

    class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    }

    enum Scope {
        public = 0,
        protected = 1,
        private = 2
    }

    class InterfaceDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        methods: InterfaceMethodDefinition[];
        newSignatures: InterfaceNewSignatureDefinition[];
        properties: InterfacePropertyDefinition[];
        typeParameters: TypeParameterDefinition<this>[];
        extendsTypeExpressions: TypeExpression[];
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

    class InterfaceNewSignatureDefinition implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition, IParentedDefinition<InterfaceDefinition> {
        parent: InterfaceDefinition;
        parameters: InterfaceNewSignatureParameterDefinition[];
        returnTypeExpression: TypeExpression;
    }

    class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    }

    class EnumDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, IAmbientableDefinition {
        members: EnumMemberDefinition[];
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class EnumMemberDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
        value: number;
        name: string;
        parent: EnumDefinition;
    }

    enum NamespaceDeclarationType {
        Namespace = 0,
        Module = 1
    }

    class NamespaceDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, IModuledDefinition, IAmbientableDefinition {
        declarationType: NamespaceDeclarationType;
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        exports: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
        typeAliases: TypeAliasDefinition[];
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class FileDefinition implements IModuledDefinition {
        fileName: string;
        imports: ImportDefinition[];
        reExports: ReExportDefinition[];
        defaultExport: Expression | ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        typeAliases: TypeAliasDefinition[];
        exports: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];

        write(): string;
        writeExportsAsDefinitionFile(options: { definitionName: string; moduleName: string; referencePaths: string[]; }): string;
    }

    class ImportDefinition {
        file: FileDefinition;
        definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
    }

    class ReExportDefinition {
        file: FileDefinition;
        definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
    }

    class VariableDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition {
        declarationType: VariableDeclarationType;
        name: string;
        parent: FileDefinition | NamespaceDefinition;
        isExported: boolean;
        isNamedExportOfFile: boolean;
        isDefaultExportOfFile: boolean;
        typeExpression: TypeExpression;
        defaultExpression: Expression;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
    }

    enum VariableDeclarationType {
        Var = 0,
        Let = 1,
        Const = 2
    }

    class Expression {
        text: string;
    }

    class Type {
        callSignatures: CallSignatureDefinition[];
        definition: IBaseNamedDefinition;
        properties: TypePropertyDefinition[];
        typeArguments: TypeExpression[];
        text: string;
    }

    class TypeExpression {
        text: string;
        types: Type[];
    }
}

declare module "ts-type-info" {
    export = TsTypeInfo;
}
