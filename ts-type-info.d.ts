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
        decorators: DecoratorDefinition[];
    }

    class DecoratableDefinition implements IDecoratableDefinition {
        decorators: DecoratorDefinition[];
    }

    interface IExportableDefinition {
        isExported: boolean;
        hasExportKeyword: boolean;
    }

    class ExportableDefinition implements IExportableDefinition {
        isExported: boolean;
        hasExportKeyword: boolean;
    }

    interface IModuledDefinition {
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        exports: (IBaseNamedDefinition & IExportableDefinition)[];
    }

    class ModuledDefinition implements IModuledDefinition {
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        exports: (IBaseNamedDefinition & IExportableDefinition)[];
    }

    class BasePropertyDefinition implements ITypeExpressionedDefinition, INamedDefinition {
        isOptional: boolean;
        name: string;
        typeExpression: TypeExpression;
    }

    interface ITypeParameteredDefinition {
        typeParameters: TypeParameterDefinition[];
    }

    class TypeParameteredDefinition implements ITypeParameteredDefinition {
        typeParameters: TypeParameterDefinition[];
    }

    class TypeParameterDefinition implements INamedDefinition {
        constraintTypeExpression: TypeExpression;
        name: string;
    }

    class ObjectPropertyDefinition extends BasePropertyDefinition implements IDefaultExpressionedDefinition {
        defaultExpression: Expression;
    }

    class DecoratorDefinition implements IBaseNamedDefinition {
        name: string;
        arguments: Expression[];
    }

    class BaseFunctionDefinition<T extends BaseParameterDefinition> implements INamedDefinition, ITypeParameteredDefinition, IParameteredDefinition<T>, IReturnTypedDefinition {
        name: string;
        parameters: T[];
        returnTypeExpression: TypeExpression;
        typeParameters: TypeParameterDefinition[];
    }

    interface BaseParameterDefinitionConstructor<T extends BaseParameterDefinition> {
    }

    class BaseParameterDefinition implements INamedDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
        isOptional: boolean;
        isRestParameter: boolean;
        name: string;
        typeExpression: TypeExpression;
        defaultExpression: Expression;
    }

    interface IParameteredDefinition<T extends ParameterDefinition> {
        parameters: T[];
    }

    class ParameteredDefinition<T extends ParameterDefinition> implements IParameteredDefinition<T> {
        parameters: T[];
    }

    interface IReturnTypedDefinition {
        returnTypeExpression: TypeExpression;
    }

    class ReturnTypedDefinition implements IReturnTypedDefinition {
        returnTypeExpression: TypeExpression;
    }

    class CallSignatureDefinition implements ITypeParameteredDefinition, IParameteredDefinition<ParameterDefinition>, IReturnTypedDefinition {
        minArgumentCount: number;
        parameters: ParameterDefinition[];
        returnTypeExpression: TypeExpression;
        typeParameters: TypeParameterDefinition[];
    }

    class FunctionDefinition extends BaseFunctionDefinition<ParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
        isExported: boolean;
        hasExportKeyword: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class ParameterDefinition extends BaseParameterDefinition {
    }

    class BaseClassMethodDefinition extends BaseFunctionDefinition<ClassMethodParameterDefinition> implements IDecoratableDefinition, IScopedDefinition {
        decorators: DecoratorDefinition[];
        scope: Scope;
    }

    class BaseClassPropertyDefinition extends ObjectPropertyDefinition implements IDecoratableDefinition, IScopedDefinition {
        decorators: DecoratorDefinition[];
        scope: Scope;
    }

    interface IScopedDefinition {
        scope: Scope;
    }

    class ScopedDefinition implements IScopedDefinition {
        scope: Scope;
    }

    class ClassDefinition implements INamedDefinition, IDecoratableDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        isAbstract: boolean;
        methods: ClassMethodDefinition[];
        properties: ClassPropertyDefinition[];
        staticMethods: ClassStaticMethodDefinition[];
        staticProperties: ClassStaticPropertyDefinition[];
        constructorDef: ConstructorDefinition;
        typeParameters: TypeParameterDefinition[];
        extendsTypeExpressions: TypeExpression[];
        implementsTypeExpressions: TypeExpression[];
        name: string;
        decorators: DecoratorDefinition[];
        isExported: boolean;
        hasExportKeyword: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class ClassMethodDefinition extends BaseClassMethodDefinition {
    }

    class ClassMethodParameterDefinition extends BaseParameterDefinition implements IDecoratableDefinition {
        decorators: DecoratorDefinition[];
    }

    class ClassPropertyDefinition extends BaseClassPropertyDefinition {
        isAccessor: boolean;
        isReadonly: boolean;
    }

    class ConstructorDefinition implements IParameteredDefinition<ClassMethodParameterDefinition> {
        parameters: ClassMethodParameterDefinition[];
    }

    class ClassStaticMethodDefinition extends BaseClassMethodDefinition {
    }

    class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    }

    enum Scope {
        public = 0,
        protected = 1,
        private = 2
    }

    class InterfaceDefinition implements INamedDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
        methods: InterfaceMethodDefinition[];
        newSignatures: InterfaceNewSignatureDefinition[];
        properties: InterfacePropertyDefinition[];
        typeParameters: TypeParameterDefinition[];
        extendsTypeExpressions: TypeExpression[];
        name: string;
        isExported: boolean;
        hasExportKeyword: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class InterfaceMethodDefinition extends BaseFunctionDefinition<ParameterDefinition> {
    }

    class InterfacePropertyDefinition extends BasePropertyDefinition {
    }

    class InterfaceNewSignatureDefinition implements IParameteredDefinition<ParameterDefinition>, IReturnTypedDefinition {
        parameters: ParameterDefinition[];
        returnTypeExpression: TypeExpression;
    }

    class EnumDefinition implements INamedDefinition, IExportableDefinition, IAmbientableDefinition {
        members: EnumMemberDefinition[];
        name: string;
        isExported: boolean;
        hasExportKeyword: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class EnumMemberDefinition implements INamedDefinition {
        value: number;
        name: string;
    }

    enum NamespaceDeclarationType {
        Namespace = 0,
        Module = 1
    }

    class NamespaceDefinition implements INamedDefinition, IExportableDefinition, IModuledDefinition, IAmbientableDefinition {
        declarationType: NamespaceDeclarationType;
        name: string;
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        exports: (IBaseNamedDefinition & IExportableDefinition)[];
        isExported: boolean;
        hasExportKeyword: boolean;
        isAmbient: boolean;
        hasDeclareKeyword: boolean;

        write(): string;
    }

    class FileDefinition implements IModuledDefinition {
        fileName: string;
        imports: ImportDefinition[];
        reExports: ReExportDefinition[];
        name: string;
        namespaces: NamespaceDefinition[];
        classes: ClassDefinition[];
        interfaces: InterfaceDefinition[];
        enums: EnumDefinition[];
        functions: FunctionDefinition[];
        variables: VariableDefinition[];
        exports: (IBaseNamedDefinition & IExportableDefinition)[];

        write(): string;
        writeExportsAsDefinitionFile(options: { definitionName: string; moduleName: string; referencePaths: string[]; }): string;
    }

    class ImportDefinition {
        file: FileDefinition;
        definition: IBaseNamedDefinition & IExportableDefinition;
    }

    class ReExportDefinition {
        file: FileDefinition;
        definition: IBaseNamedDefinition & IExportableDefinition;
    }

    class VariableDefinition implements INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition {
        declarationType: VariableDeclarationType;
        name: string;
        isExported: boolean;
        typeExpression: TypeExpression;
        hasExportKeyword: boolean;
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
        properties: BasePropertyDefinition[];
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
