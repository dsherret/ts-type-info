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

export abstract class NamedDefinition {
    name: string;
}

export abstract class ParentedDefinition<ParentType> {
    parent: ParentType;
}

export abstract class AbstractableDefinition {
    isAbstract: boolean;
}

export abstract class AmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

export abstract class TypeExpressionedDefinition {
    typeExpression: TypeExpressionDefinition;
}

export abstract class DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;
}

export abstract class DecoratableDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

export abstract class ExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
}

export abstract class ModuledDefinition {
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType>, TypeExpressionedDefinition {
    isOptional: boolean;
    name: string;
    parent: ParentType;
    typeExpression: TypeExpressionDefinition;
}

export abstract class TypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;
}

export class BaseFunctionDefinition<ParentType, ParameterType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType>, TypeParameteredDefinition, ParameteredDefinition<ParameterType>, ReturnTypedDefinition {
    name: string;
    parent: ParentType;
    parameters: ArrayExt<ParameterType>;
    returnTypeExpression: TypeExpressionDefinition;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType>, TypeExpressionedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    name: string;
    parent: ParentType;
    typeExpression: TypeExpressionDefinition;
    defaultExpression: ExpressionDefinition;
}

export abstract class ParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;
}

export abstract class ReturnTypedDefinition {
    returnTypeExpression: TypeExpressionDefinition;
}

export class TypeParameterDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpressionDefinition;
    name: string;
    parent: ParentType;
}

export class TypePropertyDefinition extends BasePropertyDefinition<TypeDefinition> {
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<FileDefinition | NamespaceDefinition>, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition {
    name: string;
    parent: FileDefinition | NamespaceDefinition;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeExpression: TypeExpressionDefinition;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    write(): string;
}

export class DecoratorDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType> {
    arguments: ArrayExt<ExpressionDefinition>;
    name: string;
    parent: ParentType;
}

export class ExpressionDefinition {
    text: string;
}

export class TypeDefinition {
    callSignatures: ArrayExt<CallSignatureDefinition>;
    definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>;
    properties: ArrayExt<TypePropertyDefinition>;
    typeArguments: ArrayExt<TypeDefinition>;
    text: string;
}

export class TypeExpressionDefinition extends ExpressionDefinition {
    types: ArrayExt<TypeDefinition>;
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition>, ReturnTypedDefinition {
    minArgumentCount: number;
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    returnTypeExpression: TypeExpressionDefinition;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
}

export class FunctionDefinition extends BaseFunctionDefinition<FileDefinition | NamespaceDefinition, FunctionParameterDefinition> implements ExportableDefinition, AmbientableDefinition {
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

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements DecoratableDefinition, ScopedDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    scope: "public" | "protected" | "private";
}

export class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements DecoratableDefinition, ScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
    scope: "public" | "protected" | "private";
}

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements DecoratableDefinition, ScopedDefinition {
    decorators: ArrayExt<DecoratorDefinition<this>>;
    scope: "public" | "protected" | "private";
}

export abstract class ScopedDefinition {
    scope: "public" | "protected" | "private";
}

export class ClassDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<FileDefinition | NamespaceDefinition>, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition {
    methods: ArrayExt<ClassMethodDefinition>;
    properties: ArrayExt<ClassPropertyDefinition>;
    staticMethods: ArrayExt<ClassStaticMethodDefinition>;
    staticProperties: ArrayExt<ClassStaticPropertyDefinition>;
    constructorDef: ClassConstructorDefinition;
    extendsTypeExpressions: ArrayExt<TypeExpressionDefinition>;
    implementsTypeExpressions: ArrayExt<TypeExpressionDefinition>;
    name: string;
    parent: FileDefinition | NamespaceDefinition;
    decorators: ArrayExt<DecoratorDefinition<this>>;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isAbstract: boolean;

    write(): string;
    addProperty(prop: ClassPropertyStructure): void;
}

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements AbstractableDefinition {
    isAbstract: boolean;
}

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
}

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;
}

export class ClassConstructorDefinition extends BaseDefinition implements ParentedDefinition<ClassDefinition>, ParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    parent: ClassDefinition;
    parameters: ArrayExt<ClassConstructorParameterDefinition>;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements DecoratableDefinition {
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

export class InterfaceDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<FileDefinition | NamespaceDefinition>, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition {
    methods: ArrayExt<InterfaceMethodDefinition>;
    newSignatures: ArrayExt<InterfaceNewSignatureDefinition>;
    properties: ArrayExt<InterfacePropertyDefinition>;
    extendsTypeExpressions: ArrayExt<TypeExpressionDefinition>;
    name: string;
    parent: FileDefinition | NamespaceDefinition;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
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

export class InterfaceNewSignatureDefinition extends BaseDefinition implements ParameteredDefinition<InterfaceNewSignatureParameterDefinition>, ReturnTypedDefinition, ParentedDefinition<InterfaceDefinition> {
    parent: InterfaceDefinition;
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    returnTypeExpression: TypeExpressionDefinition;
}

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
}

export class EnumDefinition extends BaseDefinition implements ParentedDefinition<FileDefinition | NamespaceDefinition>, ExportableDefinition, AmbientableDefinition {
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

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<EnumDefinition> {
    value: number;
    name: string;
    parent: EnumDefinition;
}

type NamespaceDeclarationType = "namespace" | "module";

export const NamespaceDeclarationType: { Namespace: "namespace" | "module"; Module: "namespace" | "module"; };

export class NamespaceDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<FileDefinition | NamespaceDefinition>, ExportableDefinition, ModuledDefinition, AmbientableDefinition {
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

export class FileDefinition extends BaseDefinition implements ModuledDefinition {
    fileName: string;
    imports: ArrayExt<ImportDefinition>;
    reExports: ArrayExt<ReExportDefinition>;
    defaultExport: { expression: ExpressionDefinition; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; };
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

export class ImportDefinition extends BaseDefinition implements ParentedDefinition<FileDefinition> {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    defaultImport: { importName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: ExpressionDefinition; };
    namedImports: ArrayExt<{ importName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: ExpressionDefinition; }>;
    starImports: ArrayExt<{ importName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: ExpressionDefinition; }>;
    parent: FileDefinition;
}

export class ReExportDefinition extends BaseDefinition implements ParentedDefinition<FileDefinition> {
    fileName: string;
    moduleSpecifier: string;
    starExports: ArrayExt<{ exportName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: ExpressionDefinition; }>;
    namedExports: ArrayExt<{ exportName: string; definitions: ArrayExt<ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition>; expression: ExpressionDefinition; }>;
    parent: FileDefinition;

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<FileDefinition | NamespaceDefinition>, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition {
    declarationType: "var" | "let" | "const";
    name: string;
    parent: FileDefinition | NamespaceDefinition;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeExpression: TypeExpressionDefinition;
    defaultExpression: ExpressionDefinition;
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

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: string[];
    definitions?: NamedStructure[];
    text: string;
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
