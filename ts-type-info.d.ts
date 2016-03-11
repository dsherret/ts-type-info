import CodeBlockWriter from "code-block-writer";

export function getInfoFromFiles(fileNames: string[], options?: Options): ArrayExt<FileDefinition>;

export function getInfoFromString(code: string, options?: Options): FileDefinition;

export interface Options {
    compilerOptions?: CompilerOptions;
    showDebugMessages?: boolean;
}

export interface CompilerOptions {
    allowNonTsExtensions?: boolean;
    charset?: string;
    locale?: string;
    project?: string;
    rootDir?: string;
}

export class ArrayExt<T> extends Array<T> {
    constructor(...items: T[]);

    firstOrDefault(condition: (item: T) => boolean): T;
    removeWhere(condition: (item: T) => boolean): void;
}

export abstract class BaseDefinition {
    onBeforeWrite: (writer: CodeBlockWriter) => void;
    onAfterWrite: (writer: CodeBlockWriter) => void;

    isClassDefinition(): boolean;
    isClassMethodDefinition(): boolean;
    isClassPropertyDefinition(): boolean;
    isClassStaticMethodDefinition(): boolean;
    isClassStaticPropertyDefinition(): boolean;
    isClassConstructorDefinition(): boolean;
    isClassConstructorParameterDefinition(): boolean;
    isEnumDefinition(): boolean;
    isExportableDefinition(): boolean;
    isFunctionDefinition(): boolean;
    isFileDefinition(): boolean;
    isImportDefinition(): boolean;
    isInterfaceDefinition(): boolean;
    isInterfaceMethodDefinition(): boolean;
    isInterfaceNewSignatureDefinition(): boolean;
    isInterfacePropertyDefinition(): boolean;
    isNamespaceDefinition(): boolean;
    isReExportDefinition(): boolean;
    isTypeAliasDefinition(): boolean;
    isVariableDefinition(): boolean;
}

export enum DefinitionType {
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

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
}

export abstract class NamedDefinition implements INamedDefinition {
    name: string;
}

export interface IParentedDefinition<ParentType> {
    parent: ParentType;
}

export interface IAbstractableDefinition {
    isAbstract: boolean;
}

export abstract class AbstractableDefinition implements IAbstractableDefinition {
    isAbstract: boolean;
}

export interface IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
}

export interface IDefaultExpressionedDefinition {
    defaultExpression: Expression;
}

export abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;
}

export interface IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

export interface IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
}

export interface IModuledDefinition {
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export abstract class ModuledDefinition implements IModuledDefinition {
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;
    name: string;
    parent: ParentType;
    typeExpression: TypeExpression;
}

export interface ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;
}

export class BaseFunctionDefinition<ParentType, ParameterType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition, IParameteredDefinition<ParameterType>, IReturnTypedDefinition {
    name: string;
    parent: ParentType;
    parameters: ArrayExt<ParameterType>;
    returnTypeExpression: TypeExpression;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    name: string;
    parent: ParentType;
    typeExpression: TypeExpression;
    defaultExpression: Expression;
}

export interface IParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;
}

export interface IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;
}

export class TypeParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpression;
    name: string;
    parent: ParentType;
}

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
}

export class TypeAliasDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeExpressionedDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
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

export class DecoratorDefinition<ParentType> extends BaseDefinition implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
    arguments: ArrayExt<Expression>;
    name: string;
    parent: ParentType;
}

export class CallSignatureDefinition extends BaseDefinition implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    returnTypeExpression: TypeExpression;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
}

export class FunctionDefinition extends BaseFunctionDefinition<FileDefinition | NamespaceDefinition, FunctionParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    write(): string;
}

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
}

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

export class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements IDecoratableDefinition, IScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
    scope: "public" | "protected" | "private";
}

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    scope: "public" | "protected" | "private";
}

export interface IScopedDefinition {
    scope: "public" | "protected" | "private";
}

export abstract class ScopedDefinition implements IScopedDefinition {
    scope: "public" | "protected" | "private";
}

export class ClassDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IDecoratableDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition, IAbstractableDefinition {
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
    addProperty(prop: ClassPropertyStructure): void;
}

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    isAbstract: boolean;
}

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
}

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;
}

export class ClassConstructorDefinition extends BaseDefinition implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    parent: ClassDefinition;
    parameters: ArrayExt<ClassConstructorParameterDefinition>;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    scope: "none" | "public" | "protected" | "private";
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

type ClassConstructorParameterScope = "none" | "public" | "protected" | "private";

export const ClassConstructorParameterScope: { None: "none" | "public" | "protected" | "private"; Public: "none" | "public" | "protected" | "private"; Protected: "none" | "public" | "protected" | "private"; Private: "none" | "public" | "protected" | "private"; toScope(scope: "none" | "public" | "protected" | "private"): "public" | "protected" | "private"; };

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
}

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
}

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
}

type Scope = "public" | "protected" | "private";

export const Scope: { Public: "public" | "protected" | "private"; Protected: "public" | "protected" | "private"; Private: "public" | "protected" | "private"; };

export class InterfaceDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
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

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
}

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
}

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
}

export class InterfaceNewSignatureDefinition extends BaseDefinition implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition, IParentedDefinition<InterfaceDefinition> {
    parent: InterfaceDefinition;
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    returnTypeExpression: TypeExpression;
}

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
}

export class EnumDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, IAmbientableDefinition {
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

export class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;
    name: string;
    parent: EnumDefinition;
}

type NamespaceDeclarationType = "namespace" | "module";

export const NamespaceDeclarationType: { Namespace: "namespace" | "module"; Module: "namespace" | "module"; };

export class NamespaceDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, IModuledDefinition, IAmbientableDefinition {
    declarationType: "namespace" | "module";
    name: string;
    parent: FileDefinition | NamespaceDefinition;
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
    getExports: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    write(): string;
}

export class FileDefinition extends BaseDefinition implements IModuledDefinition {
    fileName: string;
    imports: ArrayExt<ImportDefinition>;
    reExports: ArrayExt<ReExportDefinition>;
    defaultExport: { expression: Expression; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; };
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    write(): string;
    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string; }[]; }): string;
}

export class ImportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
    defaultImport: { importName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: Expression; };
    namedImports: ArrayExt<{ importName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: Expression; }>;
    starImports: ArrayExt<{ importName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: Expression; }>;
    starImportName: string;
    moduleSpecifier: string;
    fileName: string;
    parent: FileDefinition;
}

export class ReExportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
    starExports: ArrayExt<{ exportName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: Expression; }>;
    namedExports: ArrayExt<{ exportName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: Expression; }>;
    fileName: string;
    moduleSpecifier: string;
    parent: FileDefinition;

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export class VariableDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<FileDefinition | NamespaceDefinition>, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition {
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

export const VariableDeclarationType: { Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; };

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

type NodeDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | ImportDefinition | ReExportDefinition;

type ModuleMemberDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

type BaseFunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

type FunctionWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

type FunctionBodyWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;

type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;

type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition | InterfaceNewSignatureParameterDefinition | ClassConstructorParameterDefinition | CallSignatureParameterDefinition;

type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceNewSignatureDefinition | ClassConstructorDefinition | CallSignatureDefinition;

type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;

type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;

type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;

export class Expression {
    text: string;
}

export class Type {
    callSignatures: ArrayExt<CallSignatureDefinition>;
    definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;
    properties: ArrayExt<TypePropertyDefinition>;
    typeArguments: ArrayExt<Type>;
    text: string;
}

export class TypeExpression {
    text: string;
    types: ArrayExt<Type>;
}

export interface NamedStructure {
    name: string;
}

export interface AbstractableStructure {
    isAbstract?: boolean;
}

export interface AmbientableStructure {
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
}

export interface DefaultExpressionedStructure {
    defaultExpression?: string;
}

export interface DecoratableStructure {
    decorators?: DecoratorStructure[];
}

export interface ExportableStructure {
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
}

export interface ModuledStructure {
    namespaces?: NamespaceStructure[];
    classes?: ClassStructure[];
    interfaces?: InterfaceStructure[];
    functions?: FunctionStructure[];
    enums?: EnumStructure[];
    variables?: VariableStructure[];
    typeAliases?: TypeAliasStructure[];
    exports?: (NamedStructure & ExportableStructure)[];
}

export interface ObjectPropertyStructure extends BasePropertyStructure, DefaultExpressionedStructure {
}

export interface TypeExpressionedStructure {
    type?: string;
}

export interface BasePropertyStructure extends NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
}

export interface TypeParameteredStructure {
    typeParameters?: TypeParameterStructure[];
}

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
}

export interface BaseParameterStructure extends NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
}

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: T[];
}

export interface ReturnTypedStructure {
    returnType?: string;
}

export interface DecoratorStructure extends NamedStructure {
    arguments?: string[];
}

export interface TypeAliasStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, TypeParameteredStructure, AmbientableStructure {
}

export interface TypeParameterStructure extends NamedStructure {
    constraintType?: string;
}

export interface TypePropertyStructure extends BasePropertyStructure {
}

export interface BaseClassMethodStructure<ParameterType extends BaseClassMethodParameterStructure> extends BaseFunctionStructure<ParameterType>, DecoratableStructure, ScopedStructure {
}

export interface BaseClassMethodParameterStructure extends BaseParameterStructure, DecoratableStructure {
}

export interface BaseClassPropertyStructure extends ObjectPropertyStructure, DecoratableStructure, ScopedStructure {
}

export interface ScopedStructure {
    scope?: "public" | "protected" | "private";
}

export interface ClassMethodParameterStructure extends BaseClassMethodParameterStructure {
}

export interface ClassMethodStructure extends BaseClassMethodStructure<ClassMethodParameterStructure>, AbstractableStructure {
}

export interface ClassPropertyStructure extends BaseClassPropertyStructure {
    isAccessor?: boolean;
    isReadonly?: boolean;
    isConstructorParameter?: boolean;
}

export interface ClassConstructorStructure extends ParameteredStructure<ClassConstructorParameterStructure> {
}

export interface ClassConstructorParameterStructure extends BaseParameterStructure {
    scope?: "none" | "public" | "protected" | "private";
}

export interface ClassStaticMethodParameterStructure extends BaseClassMethodParameterStructure {
}

export interface ClassStaticMethodStructure extends BaseClassMethodStructure<ClassStaticMethodParameterStructure> {
}

export interface ClassStaticPropertyStructure extends BaseClassPropertyStructure {
}

export interface ClassStructure extends NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: ClassStaticMethodStructure[];
    staticProperties?: ClassStaticPropertyStructure[];
    constructorDef?: ClassConstructorStructure;
    extendsTypes?: string[];
    implementsTypes?: string[];
}

export interface EnumStructure extends NamedStructure, ExportableStructure, AmbientableStructure {
    members?: EnumMemberStructure[];
}

export interface EnumMemberStructure extends NamedStructure {
    value: number;
}

export interface FileStructure extends ModuledStructure {
    imports?: ImportStructure[];
    reExports?: ReExportStructure[];
    fileName?: string;
    defaultExport?: string | (NamedStructure & ExportableStructure);
}

export interface ImportStructure {
}

export interface ReExportStructure {
}

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, ExportableStructure, AmbientableStructure {
}

export interface FunctionParameterStructure extends BaseParameterStructure {
}

export interface CallSignatureStructure extends TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure {
    minArgumentCount?: number;
}

export interface CallSignatureParameterStructure extends BaseParameterStructure {
}

export interface InterfaceMethodStructure extends BaseFunctionStructure<InterfaceMethodParameterStructure> {
}

export interface InterfaceMethodParameterStructure extends BaseParameterStructure {
}

export interface InterfacePropertyStructure extends BasePropertyStructure {
}

export interface InterfaceNewSignatureStructure extends ParameteredStructure<InterfaceNewSignatureParameterStructure>, ReturnTypedStructure {
}

export interface InterfaceNewSignatureParameterStructure extends BaseParameterStructure {
}

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    methods?: InterfaceMethodStructure[];
    newSignatures?: InterfaceNewSignatureStructure[];
    properties?: InterfacePropertyStructure[];
    extendsTypes?: string[];
}

export interface NamespaceStructure extends NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure {
    declarationType: "namespace" | "module";
}

export interface VariableStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType: "var" | "let" | "const";
}

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: string[];
    definitions?: NamedStructure[];
    text: string;
}
