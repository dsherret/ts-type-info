import CodeBlockWriter from "code-block-writer";

export function getInfoFromFiles(fileNames: string[], options?: Options): GlobalDefinition;

export function getInfoFromString(code: string, options?: Options): FileDefinition;

export interface Options {
    compilerOptions?: CompilerOptions;
    showDebugMessages?: boolean;
}

export interface CompilerOptions {
    [option: string]: string | number | boolean;
    allowNonTsExtensions?: boolean;
    charset?: string;
    locale?: string;
    project?: string;
    rootDir?: string;
}

export interface WriteOptions {
    newLine?: string;
    indentNumberOfSpaces?: number;
    useTabs?: boolean;
}

export abstract class BaseDefinition {
    onBeforeWrite: (writer: CodeBlockWriter) => void;
    onAfterWrite: (writer: CodeBlockWriter) => void;

    constructor(_definitionType: DefinitionType);

    private _definitionType: DefinitionType;

    isCallSignatureDefinition(): this is CallSignatureDefinition;
    isClassDefinition(): this is ClassDefinition;
    isClassMethodDefinition(): this is ClassMethodDefinition;
    isClassPropertyDefinition(): this is ClassPropertyDefinition;
    isClassStaticMethodDefinition(): this is ClassStaticMethodDefinition;
    isClassStaticPropertyDefinition(): this is ClassStaticPropertyDefinition;
    isClassConstructorDefinition(): this is ClassConstructorDefinition;
    isClassConstructorParameterDefinition(): this is ClassConstructorParameterDefinition;
    isEnumDefinition(): this is EnumDefinition;
    isExportableDefinition(): this is ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
    isExpressionDefinition(): this is ExpressionDefinition;
    isFunctionDefinition(): this is FunctionDefinition;
    isFileDefinition(): this is FileDefinition;
    isImportDefinition(): this is ImportDefinition;
    isInterfaceDefinition(): this is InterfaceDefinition;
    isInterfaceMethodDefinition(): this is InterfaceMethodDefinition;
    isInterfacePropertyDefinition(): this is InterfacePropertyDefinition;
    isNamespaceDefinition(): this is NamespaceDefinition;
    isReExportDefinition(): this is ReExportDefinition;
    isTypeDefinition(): this is TypeDefinition;
    isTypeAliasDefinition(): this is TypeAliasDefinition;
    isVariableDefinition(): this is VariableDefinition;
}

export const enum DefinitionType {
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
    Expression = 1200,
    IndexSignature = 1300,
    UserDefinedTypeGuard = 1400,
    ObjectPropertyDefinition = 1500,
    Type = 1600
}

export class FunctionBodyWriteableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
}

export abstract class NamedDefinition {
    name: string;
}

export abstract class OptionalDefinition {
    isOptional: boolean;
}

export abstract class AbstractableDefinition {
    isAbstract: boolean;
}

export abstract class AmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

export abstract class AsyncableDefinition {
    isAsync: boolean;
}

export abstract class TypedDefinition {
    type: TypeDefinition;

    setType(text: string): any;
}

export abstract class DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;

    setDefaultExpression(text: string): any;
}

export abstract class DecoratableDefinition {
    decorators: DecoratorDefinition[];

    addDecorator(structure: DecoratorStructure): DecoratorDefinition;
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

    addClass(structure: ClassStructure): ClassDefinition;
    addEnum(structure: EnumStructure): EnumDefinition;
    addFunction(structure: FunctionStructure): FunctionDefinition;
    addInterface(structure: InterfaceStructure): InterfaceDefinition;
    addNamespace(structure: NamespaceStructure): NamespaceDefinition;
    addTypeAlias(structure: TypeAliasStructure): TypeAliasDefinition;
    addVariable(structure: VariableStructure): VariableDefinition;
    getClass(nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)): ClassDefinition;
    getEnum(nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)): EnumDefinition;
    getFunction(nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)): FunctionDefinition;
    getInterface(nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)): InterfaceDefinition;
    getNamespace(nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)): NamespaceDefinition;
    getTypeAlias(nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)): TypeAliasDefinition;
    getVariable(nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)): VariableDefinition;
    directlyContains(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): boolean;
    getNamespacesToDefinition(searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): NamespaceDefinition[];
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    getMembers(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition {
    name: string;
    isOptional: boolean;
    type: TypeDefinition;
    setType: (text: string) => any;

    constructor(definitionType: DefinitionType);
}

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];

    addTypeParameter(structure: TypeParameterStructure): TypeParameterDefinition;
    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)): TypeParameterDefinition;
}

export abstract class BaseObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;

    constructor(definitionType: DefinitionType);
}

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> extends BaseDefinition implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition {
    isGenerator: boolean;
    overloadSignatures: CallSignatureDefinition[];
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition;
    name: string;
    parameters: ParameterType[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType;
    returnType: TypeDefinition;
    setReturnType: (text: string) => any;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor(definitionType: DefinitionType);

    addOverloadSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition {
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[];
    name: string;
    isOptional: boolean;
    type: TypeDefinition;
    setType: (text: string) => any;
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;

    constructor(definitionType: DefinitionType);

    addDestructuringProperty(structure: ObjectPropertyStructure): ObjectPropertyDefinition;
    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)): ObjectPropertyDefinition;
}

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[];

    abstract addParameter(structure: ParameterStructureType): ParameterType;
    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)): ParameterType;
}

export abstract class ReturnTypedDefinition {
    returnType: TypeDefinition;

    setReturnType(text: string): any;
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition;
    returnType: TypeDefinition;
    setReturnType: (text: string) => any;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor();

    addParameter(structure: CallSignatureParameterStructure): CallSignatureParameterDefinition;
    getMinArgumentCount(): number;
}

export class CallSignatureParameterDefinition extends BaseParameterDefinition {
    constructor();
}

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition {
    keyName: string;
    keyType: TypeDefinition;
    returnType: TypeDefinition;
    setReturnType: (text: string) => any;

    constructor();
}

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintType: TypeDefinition;
    name: string;

    constructor();
}

export class TypePropertyDefinition extends BasePropertyDefinition {
    constructor();
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypedDefinition, TypeParameteredDefinition, AmbientableDefinition {
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    type: TypeDefinition;
    setType: (text: string) => any;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    write(writeOptions?: WriteOptions): string;
}

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[];
    name: string;

    constructor();

    addArgument(structure: string): TypeDefinition;
}

export class ObjectPropertyDefinition extends BaseObjectPropertyDefinition {
    constructor();
}

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    parameterName: string;
    type: TypeDefinition;

    constructor();
}

export class BaseExpressionDefinition extends BaseDefinition {
    text: string;

    constructor(type: DefinitionType);
}

export class ExpressionDefinition extends BaseExpressionDefinition {
    constructor();
}

export class TypeDefinition extends BaseExpressionDefinition {
    arrayElementType: TypeDefinition;
    intersectionTypes: TypeDefinition[];
    unionTypes: TypeDefinition[];
    callSignatures: CallSignatureDefinition[];
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeDefinition[];
    text: string;

    constructor();

    getAllDefinitions(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    getIntersectionType(searchFunction: (definition: TypeDefinition) => boolean): TypeDefinition;
    getUnionType(searchFunction: (definition: TypeDefinition) => boolean): TypeDefinition;
    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    getDefinition(searchFunction: (definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean): ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)): TypePropertyDefinition;
    getTypeArgument(searchFunction: (typeArgument: TypeDefinition) => boolean): TypeDefinition;
    isArray(): boolean;
}

export class FunctionDefinition extends BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure> implements ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    addParameter(structure: FunctionParameterStructure): FunctionParameterDefinition;
    write(writeOptions?: WriteOptions): string;
}

export class FunctionParameterDefinition extends BaseParameterDefinition {
    constructor();
}

export class BaseClassMethodParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ScopedDefinition {
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";

    constructor(definitionType: DefinitionType);
}

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType> extends BaseFunctionDefinition<ParameterType, ParameterStructureType> implements AsyncableDefinition, DecoratableDefinition, ScopedDefinition, FunctionBodyWriteableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";

    constructor(definitionType: DefinitionType);

    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export class BaseClassPropertyDefinition extends BaseObjectPropertyDefinition implements DecoratableDefinition, ScopedDefinition {
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";

    constructor(definitionType: DefinitionType);
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
    extendsTypes: TypeDefinition[];
    implementsTypes: TypeDefinition[];
    name: string;
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isAbstract: boolean;

    constructor();

    write(writeOptions?: WriteOptions): string;
    addMethod(structure: ClassMethodStructure): ClassMethodDefinition;
    addProperty(structure: ClassPropertyStructure): ClassPropertyDefinition;
    addStaticMethod(structure: ClassStaticMethodStructure): ClassStaticMethodDefinition;
    addStaticProperty(structure: ClassStaticPropertyStructure): ClassStaticPropertyDefinition;
    addExtends(definition: ClassDefinition, typeArguments?: string[]): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addImplements(definition: InterfaceDefinition | ClassDefinition, typeArguments?: string[]): TypeDefinition;
    addImplements(text: string): TypeDefinition;
    getPropertiesAndConstructorParameters(): (ClassConstructorParameterDefinition | ClassPropertyDefinition)[];
    getMethod(nameOrSearchFunction: string | ((method: ClassMethodDefinition) => boolean)): ClassMethodDefinition;
    getStaticMethod(nameOrSearchFunction: string | ((staticMethod: ClassStaticMethodDefinition) => boolean)): ClassStaticMethodDefinition;
    getProperty(nameOrSearchFunction: string | ((property: ClassPropertyDefinition) => boolean)): ClassPropertyDefinition;
    getStaticProperty(nameOrSearchFunction: string | ((staticProperty: ClassStaticPropertyDefinition) => boolean)): ClassStaticPropertyDefinition;
    setConstructor(structure: ClassConstructorStructure): this;
}

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure> implements AbstractableDefinition {
    isAbstract: boolean;

    constructor();

    addParameter(structure: ClassMethodParameterStructure): ClassMethodParameterDefinition;
}

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition {
    constructor();
}

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;
    onWriteGetBody: (writer: CodeBlockWriter) => void;
    onWriteSetBody: (writer: CodeBlockWriter) => void;

    constructor();
}

export class ClassConstructorDefinition extends BaseDefinition implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => ClassConstructorParameterDefinition;

    constructor();

    addParameter(structure: ClassConstructorParameterStructure): ClassConstructorParameterDefinition;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition {
    scope: "none" | "public" | "protected" | "private";
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;

    constructor();

    toClassProperty(): ClassPropertyDefinition;
}

export type ClassConstructorParameterScope = "none" | "public" | "protected" | "private";

export const ClassConstructorParameterScope: { None: "none" | "public" | "protected" | "private"; Public: "none" | "public" | "protected" | "private"; Protected: "none" | "public" | "protected" | "private"; Private: "none" | "public" | "protected" | "private"; toScope(scope: "none" | "public" | "protected" | "private"): "public" | "protected" | "private"; };

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    constructor();

    addParameter(structure: ClassStaticMethodParameterStructure): ClassStaticMethodParameterDefinition;
}

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor();
}

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition {
    constructor();
}

export type Scope = "public" | "protected" | "private";

export const Scope: { Public: "public" | "protected" | "private"; Protected: "public" | "protected" | "private"; Private: "public" | "protected" | "private"; };

export class InterfaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition {
    methods: InterfaceMethodDefinition[];
    callSignatures: CallSignatureDefinition[];
    indexSignatures: IndexSignatureDefinition[];
    newSignatures: CallSignatureDefinition[];
    properties: InterfacePropertyDefinition[];
    extendsTypes: TypeDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    addCallSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    addExtends(definition: ClassDefinition | InterfaceDefinition, typeArguments?: string[]): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addIndexSignature(structure: IndexSignatureStructure): IndexSignatureDefinition;
    addMethod(structure: InterfaceMethodStructure): InterfaceMethodDefinition;
    addNewSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    addProperty(structure: InterfacePropertyStructure): InterfacePropertyDefinition;
    getCallSignature(searchFunction: (callSignature: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    getIndexSignature(searchFunction: (indexSignature: IndexSignatureDefinition) => boolean): IndexSignatureDefinition;
    getMethod(nameOrSearchFunction: string | ((method: InterfaceMethodDefinition) => boolean)): InterfaceMethodDefinition;
    getNewSignature(searchFunction: (newSignature: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    getProperty(nameOrSearchFunction: string | ((property: InterfacePropertyDefinition) => boolean)): InterfacePropertyDefinition;
    write(writeOptions?: WriteOptions): string;
}

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition {
    constructor();
}

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    constructor();

    addParameter(structure: InterfaceMethodParameterStructure): InterfaceMethodParameterDefinition;
}

export class InterfacePropertyDefinition extends BasePropertyDefinition {
    constructor();
}

export class EnumDefinition extends BaseDefinition implements ExportableDefinition, AmbientableDefinition {
    isConst: boolean;
    members: EnumMemberDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    addMember(structure: EnumMemberStructure): EnumMemberDefinition;
    getMember(nameOrSearchFunction: string | ((member: EnumMemberDefinition) => boolean)): EnumMemberDefinition;
    write(writeOptions?: WriteOptions): string;
}

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition {
    value: number;
    name: string;

    constructor();
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
    addClass: (structure: ClassStructure) => ClassDefinition;
    addEnum: (structure: EnumStructure) => EnumDefinition;
    addFunction: (structure: FunctionStructure) => FunctionDefinition;
    addInterface: (structure: InterfaceStructure) => InterfaceDefinition;
    addNamespace: (structure: NamespaceStructure) => NamespaceDefinition;
    addTypeAlias: (structure: TypeAliasStructure) => TypeAliasDefinition;
    addVariable: (structure: VariableStructure) => VariableDefinition;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition;
    directlyContains: (def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean;
    getNamespacesToDefinition: (searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => NamespaceDefinition[];
    getMembers: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    write(writeOptions?: WriteOptions): string;
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
    addClass: (structure: ClassStructure) => ClassDefinition;
    addEnum: (structure: EnumStructure) => EnumDefinition;
    addFunction: (structure: FunctionStructure) => FunctionDefinition;
    addInterface: (structure: InterfaceStructure) => InterfaceDefinition;
    addNamespace: (structure: NamespaceStructure) => NamespaceDefinition;
    addTypeAlias: (structure: TypeAliasStructure) => TypeAliasDefinition;
    addVariable: (structure: VariableStructure) => VariableDefinition;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition;
    directlyContains: (def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean;
    getNamespacesToDefinition: (searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => NamespaceDefinition[];
    getMembers: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];

    constructor();

    addImport(structure: ImportStructure): ImportDefinition;
    addReExport(structure: ReExportStructure): ReExportDefinition;
    getModuleSpecifierToFile(file: FileDefinition): string;
    getImport(searchFunction: (importDef: ImportDefinition) => boolean): ImportDefinition;
    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean): ReExportDefinition;
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    write(writeOptions?: WriteOptions): string;
    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string; }[]; writeOptions?: WriteOptions; }): string;
}

export class ImportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    defaultImport: ImportPartDefinition;
    namedImports: ImportPartDefinition[];
    starImports: ImportPartDefinition[];

    constructor();

    addNamedImport(structure: NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions): ImportPartDefinition;
    getNamedImport(searchFunction: (importPart: ImportPartDefinition) => boolean): ImportPartDefinition;
    getStarImport(searchFunction: (importPart: ImportPartDefinition) => boolean): ImportPartDefinition;
    setDefaultImport(importName: string): this;
    write(writeOptions?: WriteOptions): string;
}

export abstract class BaseImportPartDefinition extends BaseDefinition {
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    expression: ExpressionDefinition;

    constructor(definitionType: DefinitionType);
}

export class ImportPartDefinition extends BaseImportPartDefinition {
    importName: string;

    constructor();
}

export class ReExportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: ReExportPartDefinition[];
    namedExports: ReExportPartDefinition[];

    constructor();

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    addNamedExport(structure: NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions): ReExportPartDefinition;
    getNamedExport(searchFunction: (exportPart: ReExportPartDefinition) => boolean): ReExportPartDefinition;
    getStarExport(searchFunction: (exportPart: ReExportPartDefinition) => boolean): ReExportPartDefinition;
    write(writeOptions?: WriteOptions): string;
}

export class ReExportPartDefinition extends BaseImportPartDefinition {
    exportName: string;

    constructor();
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition {
    declarationType: "var" | "let" | "const";
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    type: TypeDefinition;
    setType: (text: string) => any;
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    write(writeOptions?: WriteOptions): string;
}

export type VariableDeclarationType = "var" | "let" | "const";

export const VariableDeclarationType: { Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; };

export class GlobalDefinition {
    files: FileDefinition[];

    addDefinitionAsImportToFile(opts: { definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition; file: FileDefinition; alias?: string; }): void;
    addFile(structure: FileStructure): FileDefinition;
    getFile(fileNameOrSearchFunction: string | ((file: FileDefinition) => boolean)): FileDefinition;
    getFileOfDefinition(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): FileDefinition;
    getFileAndNamespacesToDefinition(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): { file: FileDefinition; namespaces: NamespaceDefinition[]; };
    renameDefinitionAs(definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition, newName: string): void;
}

export type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassMethodParameterDefinition | ClassConstructorParameterDefinition;

export type TypeParameteredDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | TypeAliasDefinition;

export type ModuledDefinitions = FileDefinition | NamespaceDefinition;

export type WriteableDefinitions = FileDefinition | NamespaceDefinition | ClassDefinition | InterfaceDefinition | FunctionDefinition | EnumDefinition | VariableDefinition | TypeAliasDefinition;

export type ExportableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

export type NodeDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | ImportDefinition | ReExportDefinition;

export type ModuleMemberDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

export type BaseFunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

export type FunctionBodyWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;

export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;

export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition | ClassConstructorParameterDefinition | CallSignatureParameterDefinition;

export type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition | CallSignatureDefinition;

export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;

export type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;

export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;

export abstract class BaseError extends Error {
    constructor(message: string);
}

export class ArgumentTypeError extends BaseError {
    constructor(argName: string, expectedType: string);

    argName: string;
    expectedType: string;
}

export class FileNotFoundError extends BaseError {
    constructor(fileName: string);

    fileName: string;
}

export interface BaseStructure {
    onBeforeWrite?: (writer: CodeBlockWriter) => void;
    onAfterWrite?: (writer: CodeBlockWriter) => void;
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

export interface AsyncableStructure {
    isAsync?: boolean;
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

export interface FunctionBodyWriteableStructure {
    onWriteFunctionBody?: (writer: CodeBlockWriter) => void;
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

export interface OptionalStructure {
    isOptional?: boolean;
}

export interface BaseObjectPropertyStructure extends BasePropertyStructure, DefaultExpressionedStructure {
}

export interface TypedStructure {
    type?: string;
}

export interface BasePropertyStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure {
}

export interface TypeParameteredStructure {
    typeParameters?: TypeParameterStructure[];
}

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends BaseStructure, NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
    isGenerator?: boolean;
    overloadSignatures?: CallSignatureStructure[];
}

export interface BaseParameterStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure {
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyStructure[];
}

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: T[];
}

export interface ReturnTypedStructure {
    returnType?: string;
}

export interface CallSignatureStructure extends BaseStructure, TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure {
}

export interface CallSignatureParameterStructure extends BaseParameterStructure {
}

export interface DecoratorStructure extends BaseStructure, NamedStructure {
    arguments?: string[];
}

export interface IndexSignatureStructure extends BaseStructure, ReturnTypedStructure {
    keyName: string;
    keyType?: string;
    returnType: string;
}

export interface ObjectPropertyStructure extends BaseObjectPropertyStructure {
}

export interface TypeAliasStructure extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure {
    type: string;
}

export interface TypeParameterStructure extends BaseStructure, NamedStructure {
    constraintType?: string;
}

export interface TypePropertyStructure extends BasePropertyStructure {
}

export interface BaseClassMethodStructure<ParameterType extends BaseClassMethodParameterStructure> extends BaseFunctionStructure<ParameterType>, AsyncableStructure, DecoratableStructure, ScopedStructure, FunctionBodyWriteableStructure {
}

export interface BaseClassMethodParameterStructure extends BaseParameterStructure, DecoratableStructure {
}

export interface BaseClassPropertyStructure extends BaseObjectPropertyStructure, DecoratableStructure, ScopedStructure {
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
    onWriteGetBody?: (writer: CodeBlockWriter) => void;
    onWriteSetBody?: (writer: CodeBlockWriter) => void;
}

export interface ClassConstructorStructure extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure>, FunctionBodyWriteableStructure {
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

export interface ClassStructure extends BaseStructure, NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: ClassStaticMethodStructure[];
    staticProperties?: ClassStaticPropertyStructure[];
    constructorDef?: ClassConstructorStructure;
    extendsTypes?: string[];
    implementsTypes?: string[];
}

export interface EnumStructure extends BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure {
    isConst?: boolean;
    members?: EnumMemberStructure[];
}

export interface EnumMemberStructure extends BaseStructure, NamedStructure {
    value: number;
}

export interface FileStructure extends BaseStructure, ModuledStructure {
    imports?: ImportStructure[];
    reExports?: ReExportStructure[];
    fileName?: string;
    defaultExportExpression?: string;
}

export interface NamedImportStructureWithName {
    name: string;
    alias?: string;
}

export interface NamedImportStructureWithDefinition {
    definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
    alias?: string;
}

export interface NamedImportStructureWithDefinitions {
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    alias?: string;
}

export type NamedImportStructureTypes = NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions;

export interface ImportStructure extends BaseStructure {
    moduleSpecifier: string;
    starImportName?: string;
    defaultImportName?: string;
    namedImports?: (NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions)[];
}

export interface ReExportStructure extends BaseStructure {
    moduleSpecifier: string;
    namedExports?: (NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions)[];
}

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, AmbientableStructure, AsyncableStructure, ExportableStructure, FunctionBodyWriteableStructure {
}

export interface FunctionParameterStructure extends BaseParameterStructure {
}

export interface InterfaceMethodStructure extends BaseFunctionStructure<InterfaceMethodParameterStructure> {
}

export interface InterfaceMethodParameterStructure extends BaseParameterStructure {
}

export interface InterfacePropertyStructure extends BasePropertyStructure {
}

export interface InterfaceStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    callSignatures?: CallSignatureStructure[];
    extendsTypes?: string[];
    methods?: InterfaceMethodStructure[];
    newSignatures?: CallSignatureStructure[];
    properties?: InterfacePropertyStructure[];
}

export interface NamespaceStructure extends BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure {
    declarationType?: "namespace" | "module";
}

export interface VariableStructure extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType?: "var" | "let" | "const";
}

export function createCallSignature(structure?: CallSignatureStructure): CallSignatureDefinition;

export function createCallSignatureParameter(structure: CallSignatureParameterStructure): CallSignatureParameterDefinition;

export function createClass(structure: ClassStructure): ClassDefinition;

export function createClassConstructor(structure?: ClassConstructorStructure): ClassConstructorDefinition;

export function createClassConstructorParameter(structure: ClassConstructorParameterStructure): ClassConstructorParameterDefinition;

export function createClassMethod(structure: ClassMethodStructure): ClassMethodDefinition;

export function createClassMethodParameter(structure: ClassMethodParameterStructure): ClassMethodParameterDefinition;

export function createClassProperty(structure: ClassPropertyStructure): ClassPropertyDefinition;

export function createClassStaticMethod(structure: ClassStaticMethodStructure): ClassStaticMethodDefinition;

export function createClassStaticMethodParameter(structure: ClassStaticMethodParameterStructure): ClassStaticMethodParameterDefinition;

export function createClassStaticProperty(structure: ClassStaticPropertyStructure): ClassStaticPropertyDefinition;

export function createDecorator(structure: DecoratorStructure): DecoratorDefinition;

export function createEnum(structure: EnumStructure): EnumDefinition;

export function createEnumMember(structure: EnumMemberStructure): EnumMemberDefinition;

export function createFile(structure?: FileStructure): FileDefinition;

export function createFunction(structure: FunctionStructure): FunctionDefinition;

export function createFunctionParameter(structure: FunctionParameterStructure): FunctionParameterDefinition;

export function createImport(structure: ImportStructure): ImportDefinition;

export function createIndexSignature(structure: IndexSignatureStructure): IndexSignatureDefinition;

export function createInterface(structure: InterfaceStructure): InterfaceDefinition;

export function createInterfaceMethod(structure: InterfaceMethodStructure): InterfaceMethodDefinition;

export function createInterfaceMethodParameter(structure: InterfaceMethodParameterStructure): InterfaceMethodParameterDefinition;

export function createInterfaceProperty(structure: InterfacePropertyStructure): InterfacePropertyDefinition;

export function createNamespace(structure: NamespaceStructure): NamespaceDefinition;

export function createReExport(structure: ReExportStructure): ReExportDefinition;

export function createTypeAlias(structure: TypeAliasStructure): TypeAliasDefinition;

export function createVariable(structure: VariableStructure): VariableDefinition;
