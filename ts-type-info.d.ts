import CodeBlockWriter from "code-block-writer";

export function createFile(structure?: FileStructure): FileDefinition;

export function getInfoFromFiles(fileNames: string[], options?: Options): FileDefinition[];

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
    ImportPart = 4,
    ReExportPart = 5,
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
    TypeProperty = 1100,
    Expression = 1200
}

export abstract class NamedDefinition {
    name: string;
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
    decorators: DecoratorDefinition[];

    addDecorators(...decorators: DecoratorStructure[]): this;
    getDecorator(nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)): DecoratorDefinition;
}

export abstract class ExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
}

export abstract class ModuledDefinition {
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];

    addClasses(...classes: ClassStructure[]): this;
    addEnums(...enums: EnumStructure[]): this;
    addFunctions(...functions: FunctionStructure[]): this;
    addInterfaces(...interfaces: InterfaceStructure[]): this;
    addNamespaces(...namespaces: NamespaceStructure[]): this;
    addTypeAliases(...typeAliases: TypeAliasStructure[]): this;
    addVariables(...variables: VariableStructure[]): this;
    getClass(nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)): ClassDefinition;
    getEnum(nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)): EnumDefinition;
    getFunction(nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)): FunctionDefinition;
    getInterface(nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)): InterfaceDefinition;
    getNamespace(nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)): NamespaceDefinition;
    getTypeAlias(nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)): TypeAliasDefinition;
    getVariable(nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)): VariableDefinition;
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition {
    isOptional: boolean;
    name: string;
    typeExpression: TypeExpressionDefinition;
}

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];

    addTypeParameters(...typeParameters: TypeParameterStructure[]): this;
    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)): TypeParameterDefinition;
}

export abstract class ObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;
}

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> extends BaseDefinition implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition {
    name: string;
    parameters: ParameterType[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType;
    returnTypeExpression: TypeExpressionDefinition;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    abstract addParameters(...parameters: ParameterStructureType[]): this;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
}

export abstract class BaseParameterDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    name: string;
    typeExpression: TypeExpressionDefinition;
    defaultExpression: ExpressionDefinition;
}

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[];

    abstract addParameters(...parameters: ParameterStructureType[]): this;
    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)): ParameterType;
}

export abstract class ReturnTypedDefinition {
    returnTypeExpression: TypeExpressionDefinition;
}

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintTypeExpression: TypeExpressionDefinition;
    name: string;
}

export class TypePropertyDefinition extends BasePropertyDefinition {
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition {
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeExpression: TypeExpressionDefinition;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    write(): string;
}

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[];
    name: string;

    addArguments(...args: string[]): this;
}

export class ExpressionDefinition extends BaseDefinition {
    text: string;
}

export class TypeDefinition {
    callSignatures: CallSignatureDefinition[];
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeDefinition[];
    text: string;
}

export class TypeExpressionDefinition extends ExpressionDefinition {
    types: TypeDefinition[];
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {
    minArgumentCount: number;
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition;
    returnTypeExpression: TypeExpressionDefinition;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    addParameters(...parameters: CallSignatureParameterStructure[]): this;
}

export class CallSignatureParameterDefinition extends BaseParameterDefinition {
}

export class FunctionDefinition extends BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure> implements ExportableDefinition, AmbientableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    addParameters(...parameters: FunctionParameterStructure[]): this;
    write(): string;
}

export class FunctionParameterDefinition extends BaseParameterDefinition {
}

export class BaseClassMethodParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ScopedDefinition {
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";
}

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType> extends BaseFunctionDefinition<ParameterType, ParameterStructureType> implements DecoratableDefinition, ScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";

    abstract addParameters(...parameters: ParameterStructureType[]): this;
}

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition implements DecoratableDefinition, ScopedDefinition {
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";
}

export abstract class ScopedDefinition {
    scope: "public" | "protected" | "private";
}

export class ClassDefinition extends BaseDefinition implements NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition {
    methods: ClassMethodDefinition[];
    properties: ClassPropertyDefinition[];
    staticMethods: ClassStaticMethodDefinition[];
    staticProperties: ClassStaticPropertyDefinition[];
    constructorDef: ClassConstructorDefinition;
    extendsTypeExpressions: TypeExpressionDefinition[];
    implementsTypeExpressions: TypeExpressionDefinition[];
    name: string;
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isAbstract: boolean;

    write(): string;
    addMethods(...methods: ClassMethodStructure[]): this;
    addProperties(...properties: ClassPropertyStructure[]): this;
    addStaticMethods(...staticMethods: ClassStaticMethodStructure[]): this;
    addStaticProperties(...staticProperties: ClassStaticPropertyStructure[]): this;
    addExtends(...texts: string[]): this;
    addImplements(...texts: string[]): this;
    setConstructor(structure: ClassConstructorStructure): this;
}

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure> implements AbstractableDefinition {
    isAbstract: boolean;

    addParameters(...parameters: ClassMethodParameterStructure[]): this;
}

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition {
}

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;
}

export class ClassConstructorDefinition extends BaseDefinition implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => ClassConstructorParameterDefinition;

    addParameters(...parameters: ClassConstructorParameterStructure[]): this;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition {
    scope: "none" | "public" | "protected" | "private";
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;

    toProperty(): ClassPropertyDefinition;
}

export type ClassConstructorParameterScope = "none" | "public" | "protected" | "private";

export const ClassConstructorParameterScope: { None: "none" | "public" | "protected" | "private"; Public: "none" | "public" | "protected" | "private"; Protected: "none" | "public" | "protected" | "private"; Private: "none" | "public" | "protected" | "private"; toScope(scope: "none" | "public" | "protected" | "private"): "public" | "protected" | "private"; };

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    addParameters(...parameters: ClassStaticMethodParameterStructure[]): this;
}

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
}

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition {
}

export type Scope = "public" | "protected" | "private";

export const Scope: { Public: "public" | "protected" | "private"; Protected: "public" | "protected" | "private"; Private: "public" | "protected" | "private"; };

export class InterfaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition {
    methods: InterfaceMethodDefinition[];
    newSignatures: InterfaceNewSignatureDefinition[];
    properties: InterfacePropertyDefinition[];
    extendsTypeExpressions: TypeExpressionDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    addExtends(...texts: string[]): this;
    addMethods(...methods: InterfaceMethodStructure[]): this;
    addNewSignatures(...newSignatures: InterfaceNewSignatureStructure[]): this;
    addProperties(...properties: InterfacePropertyStructure[]): this;
    write(): string;
}

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition {
}

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    addParameters(...parameters: InterfaceMethodParameterStructure[]): this;
}

export class InterfacePropertyDefinition extends BasePropertyDefinition {
}

export class InterfaceNewSignatureDefinition extends BaseDefinition implements ParameteredDefinition<InterfaceNewSignatureParameterDefinition, InterfaceNewSignatureParameterStructure>, ReturnTypedDefinition {
    parameters: InterfaceNewSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: InterfaceNewSignatureParameterDefinition) => boolean)) => InterfaceNewSignatureParameterDefinition;
    returnTypeExpression: TypeExpressionDefinition;

    addParameters(...parameters: InterfaceNewSignatureParameterStructure[]): this;
}

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition {
}

export class EnumDefinition extends BaseDefinition implements ExportableDefinition, AmbientableDefinition {
    members: EnumMemberDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    addMembers(...members: EnumMemberStructure[]): this;
    write(): string;
}

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition {
    value: number;
    name: string;
}

export type NamespaceDeclarationType = "namespace" | "module";

export const NamespaceDeclarationType: { Namespace: "namespace" | "module"; Module: "namespace" | "module"; };

export class NamespaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition {
    declarationType: "namespace" | "module";
    name: string;
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
    getExports: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    addClasses: (...classes: ClassStructure[]) => this;
    addEnums: (...enums: EnumStructure[]) => this;
    addFunctions: (...functions: FunctionStructure[]) => this;
    addInterfaces: (...interfaces: InterfaceStructure[]) => this;
    addNamespaces: (...namespaces: NamespaceStructure[]) => this;
    addTypeAliases: (...typeAliases: TypeAliasStructure[]) => this;
    addVariables: (...variables: VariableStructure[]) => this;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    write(): string;
}

export class FileDefinition extends BaseDefinition implements ModuledDefinition {
    fileName: string;
    imports: ImportDefinition[];
    reExports: ReExportDefinition[];
    defaultExportExpression: ExpressionDefinition;
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
    addClasses: (...classes: ClassStructure[]) => this;
    addEnums: (...enums: EnumStructure[]) => this;
    addFunctions: (...functions: FunctionStructure[]) => this;
    addInterfaces: (...interfaces: InterfaceStructure[]) => this;
    addNamespaces: (...namespaces: NamespaceStructure[]) => this;
    addTypeAliases: (...typeAliases: TypeAliasStructure[]) => this;
    addVariables: (...variables: VariableStructure[]) => this;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition;

    addImports(...imports: ImportStructure[]): this;
    addReExports(...reExports: ReExportStructure[]): this;
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    write(): string;
    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string; }[]; }): string;
}

export class ImportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    defaultImport: ImportPartDefinition;
    namedImports: ImportPartDefinition[];
    starImports: ImportPartDefinition[];
}

export class ImportPartDefinition extends BaseDefinition {
    importName: string;
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    expression: ExpressionDefinition;
}

export class ReExportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: ReExportPartDefinition[];
    namedExports: ReExportPartDefinition[];

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export class ReExportPartDefinition extends BaseDefinition {
    exportName: string;
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    expression: ExpressionDefinition;
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition {
    declarationType: "var" | "let" | "const";
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeExpression: TypeExpressionDefinition;
    defaultExpression: ExpressionDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    write(): string;
}

export type VariableDeclarationType = "var" | "let" | "const";

export const VariableDeclarationType: { Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; };

export type ClassDefinitions = ClassDefinition | ClassMethodDefinition | ClassMethodParameterDefinition | ClassPropertyDefinition | ClassConstructorDefinition | ClassConstructorParameterDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassStaticMethodParameterDefinition;

export type InterfaceDefinitions = InterfaceDefinition | InterfaceMethodParameterDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition | InterfaceNewSignatureParameterDefinition;

export type EnumDefinitions = EnumDefinition | EnumMemberDefinition;

export type FunctionDefinitions = CallSignatureDefinition | CallSignatureParameterDefinition | FunctionDefinition | FunctionParameterDefinition;

export type NamespaceDefinitions = NamespaceDefinition;

export type GeneralDefinitions = TypeParameterDefinition | TypePropertyDefinition | DecoratorDefinition | TypeAliasDefinition;

export type VariableDefinitions = VariableDefinition;

export type ClassMemberDefinitions = ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export type InterfaceMemberDefinitions = InterfaceMethodDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition;

export type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassMethodParameterDefinition | ClassConstructorParameterDefinition;

export type TypeParameteredDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | TypeAliasDefinition;

export type ModuledDefinitions = FileDefinition | NamespaceDefinition;

export type WriteableDefinitions = FileDefinition | NamespaceDefinition | ClassDefinition | InterfaceDefinition | FunctionDefinition | EnumDefinition | VariableDefinition | TypeAliasDefinition;

export type ExportableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

export type NodeDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | ImportDefinition | ReExportDefinition;

export type ModuleMemberDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

export type BaseFunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

export type FunctionWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

export type FunctionBodyWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;

export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;

export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition | InterfaceNewSignatureParameterDefinition | ClassConstructorParameterDefinition | CallSignatureParameterDefinition;

export type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceNewSignatureDefinition | ClassConstructorDefinition | CallSignatureDefinition;

export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;

export type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;

export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;

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
    type: string;
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
    defaultExportExpression?: string;
}

export interface ImportStructure {
    moduleSpecifier: string;
    starImportName?: string;
    defaultImportName?: string;
    namedImports?: string[];
}

export interface ReExportStructure {
    moduleSpecifier: string;
    namedExports?: string[];
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
    declarationType?: "namespace" | "module";
}

export interface VariableStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType?: "var" | "let" | "const";
}
