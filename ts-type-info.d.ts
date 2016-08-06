import CodeBlockWriter from "code-block-writer";

export function getInfoFromFiles(fileNames: string[], options?: Options | undefined): GlobalDefinition;

export function getInfoFromString(code: string, options?: Options | undefined): FileDefinition;

export interface Options {
    compilerOptions?: CompilerOptions | undefined;
    showDebugMessages?: boolean | undefined;
}

export interface CompilerOptions {
    [option: string]: string | number | boolean | undefined;
    allowJs?: boolean | undefined;
    charset?: string | undefined;
    locale?: string | undefined;
    project?: string | undefined;
    rootDir?: string | undefined;
    strictNullChecks?: boolean | undefined;
}

export interface WriteOptions {
    newLine?: string | undefined;
    indentNumberOfSpaces?: number | undefined;
    useTabs?: boolean | undefined;
}

export abstract class BaseDefinition {
    onBeforeWrite: ((writer: CodeBlockWriter) => void) | null;
    onAfterWrite: ((writer: CodeBlockWriter) => void) | null;

    constructor(_definitionType: DefinitionType);

    private _definitionType: DefinitionType;

    isFileDefinition(): this is FileDefinition;
    isImportDefinition(): this is ImportDefinition;
    isReExportDefinition(): this is ReExportDefinition;
    isNamedImportPartDefinition(): this is NamedImportPartDefinition;
    isStarImportPartDefinition(): this is StarImportPartDefinition;
    isDefaultImportPartDefinition(): this is DefaultImportPartDefinition;
    isClassDefinition(): this is ClassDefinition;
    isClassConstructorDefinition(): this is ClassConstructorDefinition;
    isClassConstructorParameterDefinition(): this is ClassConstructorParameterDefinition;
    isClassMethodDefinition(): this is ClassMethodDefinition;
    isClassMethodParameterDefinition(): this is ClassMethodParameterDefinition;
    isClassStaticMethodDefinition(): this is ClassStaticMethodDefinition;
    isClassPropertyDefinition(): this is ClassPropertyDefinition;
    isClassStaticPropertyDefinition(): this is ClassStaticPropertyDefinition;
    isInterfaceDefinition(): this is InterfaceDefinition;
    isInterfaceMethodDefinition(): this is InterfaceMethodDefinition;
    isInterfaceMethodParameterDefinition(): this is InterfaceMethodParameterDefinition;
    isInterfacePropertyDefinition(): this is InterfacePropertyDefinition;
    isNamespaceDefinition(): this is NamespaceDefinition;
    isFunctionDefinition(): this is FunctionDefinition;
    isFunctionParameterDefinition(): this is FunctionParameterDefinition;
    isVariableDefinition(): this is VariableDefinition;
    isEnumDefinition(): this is EnumDefinition;
    isEnumMemberDefinition(): this is EnumMemberDefinition;
    isCallSignatureDefinition(): this is CallSignatureDefinition;
    isCallSignatureParameterDefinition(): this is CallSignatureParameterDefinition;
    isDecoratorDefinition(): this is DecoratorDefinition;
    isTypeAliasDefinition(): this is TypeAliasDefinition;
    isTypeParameterDefinition(): this is TypeParameterDefinition;
    isTypePropertyDefinition(): this is TypePropertyDefinition;
    isExpressionDefinition(): this is ExpressionDefinition;
    isIndexSignatureDefinition(): this is IndexSignatureDefinition;
    isUserDefinedTypeGuardDefinition(): this is UserDefinedTypeGuardDefinition;
    isObjectPropertyDefinition(): this is ObjectPropertyDefinition;
    isTypeDefinition(): this is TypeDefinition;
    isExportableDefinition(): this is ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
}

export const enum DefinitionType {
    File = 1,
    Import = 2,
    ReExport = 3,
    NamedImportPart = 6,
    StarImportPart = 7,
    DefaultImportPart = 8,
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
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
}

export abstract class NamedDefinition {
    name: string;
}

export abstract class OptionallyNamedDefinition {
    name: string | null;
}

export abstract class OrderableDefinition {
    order: number;
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

export abstract class ThisTypedDefinition {
    thisType: TypeDefinition | null;

    setThisType(definition: NamedDefinition, typeArguments?: string[] | undefined): this;
    setThisType(text: string): this;
}

export abstract class TypedDefinition {
    type: TypeDefinition;

    setType(definition: NamedDefinition, typeArguments?: string[] | undefined): this;
    setType(text: string): this;
}

export abstract class DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition | null;

    setDefaultExpression(text: string): this;
}

export abstract class DecoratableDefinition {
    decorators: DecoratorDefinition[];

    addDecorator(structure: DecoratorStructure): DecoratorDefinition;
    getDecorator(nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)): DecoratorDefinition | null;
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
    getClass(nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)): ClassDefinition | null;
    getEnum(nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)): EnumDefinition | null;
    getFunction(nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)): FunctionDefinition | null;
    getInterface(nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)): InterfaceDefinition | null;
    getNamespace(nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)): NamespaceDefinition | null;
    getTypeAlias(nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)): TypeAliasDefinition | null;
    getVariable(nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)): VariableDefinition | null;
    directlyContains(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): boolean;
    getNamespacesToDefinition(searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): NamespaceDefinition[] | null;
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    getMembers(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    setOrderOfMember(order: number, member: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): this;
}

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition {
    name: string;
    isOptional: boolean;
    type: TypeDefinition;

    constructor(definitionType: DefinitionType);

    setType(definition: NamedDefinition, typeArguments?: string[]): any;
    setType(text: string): any;
}

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];

    addTypeParameter(structure: TypeParameterStructure): TypeParameterDefinition;
    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)): TypeParameterDefinition | null;
}

export abstract class BaseObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;

    constructor(definitionType: DefinitionType);
}

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> extends BaseDefinition implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition, ThisTypedDefinition {
    isGenerator: boolean;
    overloadSignatures: CallSignatureDefinition[];
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;
    name: string;
    parameters: ParameterType[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType;
    thisType: TypeDefinition | null;
    setThisType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[] | undefined) => this;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor(definitionType: DefinitionType);

    addOverloadSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean): CallSignatureDefinition | null;
    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition {
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[];
    name: string | null;
    isOptional: boolean;
    type: TypeDefinition;
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;

    constructor(definitionType: DefinitionType);

    addDestructuringProperty(structure: ObjectPropertyStructure): ObjectPropertyDefinition;
    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)): ObjectPropertyDefinition | null;
    setType(definition: NamedDefinition, typeArguments?: string[]): any;
    setType(text: string): any;
}

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[];

    abstract addParameter(structure: ParameterStructureType): ParameterType;
    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)): ParameterType | null;
}

export abstract class ReturnTypedDefinition {
    returnType: TypeDefinition;

    setReturnType(text: string): this;
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
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
    setReturnType: (text: string) => this;

    constructor();
}

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintType: TypeDefinition | null;
    name: string;

    constructor();
}

export class TypePropertyDefinition extends BasePropertyDefinition {
    constructor();
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, AmbientableDefinition, ExportableDefinition, OrderableDefinition, TypedDefinition, TypeParameteredDefinition {
    name: string;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    type: TypeDefinition;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor();

    write(writeOptions?: WriteOptions | undefined): string;
    setType(definition: NamedDefinition, typeArguments?: string[]): any;
    setType(text: string): any;
}

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[];
    name: string;

    constructor();

    addArgument(text: string): TypeDefinition;
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
    arrayElementType: TypeDefinition | null;
    intersectionTypes: TypeDefinition[];
    unionTypes: TypeDefinition[];
    callSignatures: CallSignatureDefinition[];
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeDefinition[];
    text: string;

    constructor();

    getAllDefinitions(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    getIntersectionType(searchFunction: (definition: TypeDefinition) => boolean): TypeDefinition | null;
    getUnionType(searchFunction: (definition: TypeDefinition) => boolean): TypeDefinition | null;
    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean): CallSignatureDefinition | null;
    getDefinition(searchFunction: (definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean): ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | null;
    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)): TypePropertyDefinition | null;
    getTypeArgument(searchFunction: (typeArgument: TypeDefinition) => boolean): TypeDefinition | null;
    isArray(): boolean;
}

export class FunctionDefinition extends BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure> implements ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition, OrderableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    order: number;

    constructor();

    addParameter(structure: FunctionParameterStructure): FunctionParameterDefinition;
    write(writeOptions?: WriteOptions | undefined): string;
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
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
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

export class ClassDefinition extends BaseDefinition implements NamedDefinition, DecoratableDefinition, OrderableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition {
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
    order: number;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isAbstract: boolean;

    constructor();

    write(writeOptions?: WriteOptions | undefined): string;
    addMethod(structure: ClassMethodStructure): ClassMethodDefinition;
    addProperty(structure: ClassPropertyStructure): ClassPropertyDefinition;
    addStaticMethod(structure: ClassStaticMethodStructure): ClassStaticMethodDefinition;
    addStaticProperty(structure: ClassStaticPropertyStructure): ClassStaticPropertyDefinition;
    addExtends(definition: ClassDefinition, typeArguments?: string[] | undefined): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addImplements(definition: InterfaceDefinition | ClassDefinition, typeArguments?: string[] | undefined): TypeDefinition;
    addImplements(text: string): TypeDefinition;
    getPropertiesAndConstructorParameters(): (ClassConstructorParameterDefinition | ClassPropertyDefinition)[];
    getMethod(nameOrSearchFunction: string | ((method: ClassMethodDefinition) => boolean)): ClassMethodDefinition | null;
    getStaticMethod(nameOrSearchFunction: string | ((staticMethod: ClassStaticMethodDefinition) => boolean)): ClassStaticMethodDefinition | null;
    getProperty(nameOrSearchFunction: string | ((property: ClassPropertyDefinition) => boolean)): ClassPropertyDefinition | null;
    getStaticProperty(nameOrSearchFunction: string | ((staticProperty: ClassStaticPropertyDefinition) => boolean)): ClassStaticPropertyDefinition | null;
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
    onWriteGetBody: ((writer: CodeBlockWriter) => void) | null;
    onWriteSetBody: ((writer: CodeBlockWriter) => void) | null;

    constructor();
}

export class ClassConstructorDefinition extends BaseDefinition implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition {
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
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

export class InterfaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, OrderableDefinition {
    methods: InterfaceMethodDefinition[];
    callSignatures: CallSignatureDefinition[];
    indexSignatures: IndexSignatureDefinition[];
    newSignatures: CallSignatureDefinition[];
    properties: InterfacePropertyDefinition[];
    extendsTypes: TypeDefinition[];
    name: string;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor();

    addCallSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    addExtends(definition: ClassDefinition | InterfaceDefinition, typeArguments?: string[] | undefined): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addIndexSignature(structure: IndexSignatureStructure): IndexSignatureDefinition;
    addMethod(structure: InterfaceMethodStructure): InterfaceMethodDefinition;
    addNewSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    addProperty(structure: InterfacePropertyStructure): InterfacePropertyDefinition;
    getCallSignature(searchFunction: (callSignature: CallSignatureDefinition) => boolean): CallSignatureDefinition | null;
    getIndexSignature(searchFunction: (indexSignature: IndexSignatureDefinition) => boolean): IndexSignatureDefinition | null;
    getMethod(nameOrSearchFunction: string | ((method: InterfaceMethodDefinition) => boolean)): InterfaceMethodDefinition | null;
    getNewSignature(searchFunction: (newSignature: CallSignatureDefinition) => boolean): CallSignatureDefinition | null;
    getProperty(nameOrSearchFunction: string | ((property: InterfacePropertyDefinition) => boolean)): InterfacePropertyDefinition | null;
    write(writeOptions?: WriteOptions | undefined): string;
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

export class EnumDefinition extends BaseDefinition implements AmbientableDefinition, ExportableDefinition, OrderableDefinition {
    isConst: boolean;
    members: EnumMemberDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    addMember(structure: EnumMemberStructure): EnumMemberDefinition;
    getMember(nameOrSearchFunction: string | ((member: EnumMemberDefinition) => boolean)): EnumMemberDefinition | null;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition {
    value: number;
    name: string;

    constructor();
}

export type NamespaceDeclarationType = "namespace" | "module";

export const NamespaceDeclarationType: { Namespace: "namespace" | "module"; Module: "namespace" | "module"; };

export class NamespaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition {
    declarationType: "namespace" | "module";
    name: string;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
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
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition | null;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition | null;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition | null;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition | null;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition | null;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition | null;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition | null;
    directlyContains: (def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean;
    getNamespacesToDefinition: (searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => NamespaceDefinition[] | null;
    getMembers: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    setOrderOfMember: (order: number, member: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => this;
    order: number;

    constructor();

    write(writeOptions?: WriteOptions | undefined): string;
}

export class FileDefinition extends BaseDefinition implements ModuledDefinition {
    fileName: string;
    imports: ImportDefinition[];
    reExports: ReExportDefinition[];
    defaultExportExpression: ExpressionDefinition | null;
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
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition | null;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition | null;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition | null;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition | null;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition | null;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition | null;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition | null;
    directlyContains: (def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean;
    getNamespacesToDefinition: (searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => NamespaceDefinition[] | null;
    getMembers: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    setOrderOfMember: (order: number, member: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => this;

    constructor();

    addImport(structure: ImportStructure): ImportDefinition;
    addReExport(structure: ReExportStructure): ReExportDefinition;
    getModuleSpecifierToFile(file: FileDefinition): string;
    getImport(searchFunction: (importDef: ImportDefinition) => boolean): ImportDefinition | null;
    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean): ReExportDefinition | null;
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    write(writeOptions?: WriteOptions | undefined): string;
    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string; }[]; writeOptions?: WriteOptions | undefined; }): string;
}

export class ImportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string | null;
    defaultImport: DefaultImportPartDefinition | null;
    namedImports: NamedImportPartDefinition[];
    starImports: StarImportPartDefinition[];

    constructor();

    addNamedImport(structure: NamedImportPartStructure): NamedImportPartDefinition;
    getNamedImport(searchFunction: (importPart: NamedImportPartDefinition) => boolean): NamedImportPartDefinition | null;
    getStarImport(searchFunction: (importPart: StarImportPartDefinition) => boolean): StarImportPartDefinition | null;
    setDefaultImport(importName: string): this;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class ReExportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: StarImportPartDefinition[];
    namedExports: NamedImportPartDefinition[];

    constructor();

    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    addNamedExport(structure: NamedImportPartStructure): NamedImportPartDefinition;
    getNamedExport(searchFunction: (exportPart: NamedImportPartDefinition) => boolean): NamedImportPartDefinition | null;
    getStarExport(searchFunction: (exportPart: StarImportPartDefinition) => boolean): StarImportPartDefinition | null;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class NamedImportPartDefinition extends BaseDefinition {
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    expression: ExpressionDefinition | null;
    alias: string | null;
    name: string;

    constructor();
}

export class StarImportPartDefinition extends BaseDefinition {
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    expression: ExpressionDefinition | null;
    name: string;

    constructor();
}

export class DefaultImportPartDefinition extends BaseDefinition {
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    expression: ExpressionDefinition;
    name: string;

    constructor();
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition, OrderableDefinition {
    declarationType: "var" | "let" | "const";
    name: string;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    type: TypeDefinition;

    constructor();

    write(writeOptions?: WriteOptions | undefined): string;
    setType(definition: NamedDefinition, typeArguments?: string[]): any;
    setType(text: string): any;
}

export type VariableDeclarationType = "var" | "let" | "const";

export const VariableDeclarationType: { Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; };

export class GlobalDefinition {
    files: FileDefinition[];

    addDefinitionAsImportToFile(opts: { definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition; file: FileDefinition; alias?: string | undefined; }): void;
    addFile(structure: FileStructure): FileDefinition;
    getFile(fileNameOrSearchFunction: string | ((file: FileDefinition) => boolean)): FileDefinition | null;
    getFileOfDefinition(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): FileDefinition | null;
    getFileAndNamespacesToDefinition(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): { file: FileDefinition; namespaces: NamespaceDefinition[]; } | null;
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
    onBeforeWrite?: ((writer: CodeBlockWriter) => void) | undefined;
    onAfterWrite?: ((writer: CodeBlockWriter) => void) | undefined;
}

export interface NamedStructure {
    name: string;
}

export interface OptionallyNamedStructure {
    name?: string | undefined;
}

export interface AbstractableStructure {
    isAbstract?: boolean | undefined;
}

export interface AmbientableStructure {
    isAmbient?: boolean | undefined;
    hasDeclareKeyword?: boolean | undefined;
}

export interface AsyncableStructure {
    isAsync?: boolean | undefined;
}

export interface DefaultExpressionedStructure {
    defaultExpression?: string | undefined;
}

export interface DecoratableStructure {
    decorators?: DecoratorStructure[] | undefined;
}

export interface ExportableStructure {
    isExported?: boolean | undefined;
    isNamedExportOfFile?: boolean | undefined;
    isDefaultExportOfFile?: boolean | undefined;
}

export interface FunctionBodyWriteableStructure {
    onWriteFunctionBody?: ((writer: CodeBlockWriter) => void) | undefined;
}

export interface ModuledStructure {
    namespaces?: NamespaceStructure[] | undefined;
    classes?: ClassStructure[] | undefined;
    interfaces?: InterfaceStructure[] | undefined;
    functions?: FunctionStructure[] | undefined;
    enums?: EnumStructure[] | undefined;
    variables?: VariableStructure[] | undefined;
    typeAliases?: TypeAliasStructure[] | undefined;
}

export interface OptionalStructure {
    isOptional?: boolean | undefined;
}

export interface BaseObjectPropertyStructure extends BasePropertyStructure, DefaultExpressionedStructure {
}

export interface TypedStructure {
    type?: string | undefined;
}

export interface BasePropertyStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure {
}

export interface TypeParameteredStructure {
    typeParameters?: TypeParameterStructure[] | undefined;
}

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends BaseStructure, NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
    isGenerator?: boolean | undefined;
    overloadSignatures?: CallSignatureStructure[] | undefined;
}

export interface BaseParameterStructure extends BaseStructure, OptionallyNamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure {
    isRestParameter?: boolean | undefined;
    destructuringProperties?: ObjectPropertyStructure[] | undefined;
}

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: T[] | undefined;
}

export interface ReturnTypedStructure {
    returnType?: string | undefined;
}

export interface CallSignatureStructure extends BaseStructure, TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure {
}

export interface CallSignatureParameterStructure extends BaseParameterStructure {
}

export interface DecoratorStructure extends BaseStructure, NamedStructure {
    arguments?: string[] | undefined;
}

export interface IndexSignatureStructure extends BaseStructure, ReturnTypedStructure {
    keyName: string;
    keyType?: string | undefined;
    returnType: string;
}

export interface ObjectPropertyStructure extends BaseObjectPropertyStructure {
}

export interface TypeAliasStructure extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure {
    type: string;
}

export interface TypeParameterStructure extends BaseStructure, NamedStructure {
    constraintType?: string | undefined;
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
    scope?: "public" | "protected" | "private" | undefined;
}

export interface ClassMethodParameterStructure extends BaseClassMethodParameterStructure {
}

export interface ClassMethodStructure extends BaseClassMethodStructure<ClassMethodParameterStructure>, AbstractableStructure {
}

export interface ClassPropertyStructure extends BaseClassPropertyStructure {
    isAccessor?: boolean | undefined;
    isReadonly?: boolean | undefined;
    onWriteGetBody?: ((writer: CodeBlockWriter) => void) | undefined;
    onWriteSetBody?: ((writer: CodeBlockWriter) => void) | undefined;
}

export interface ClassConstructorStructure extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure>, FunctionBodyWriteableStructure {
}

export interface ClassConstructorParameterStructure extends BaseParameterStructure {
    scope?: "none" | "public" | "protected" | "private" | undefined;
}

export interface ClassStaticMethodParameterStructure extends BaseClassMethodParameterStructure {
}

export interface ClassStaticMethodStructure extends BaseClassMethodStructure<ClassStaticMethodParameterStructure> {
}

export interface ClassStaticPropertyStructure extends BaseClassPropertyStructure {
}

export interface ClassStructure extends BaseStructure, NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure {
    methods?: ClassMethodStructure[] | undefined;
    properties?: ClassPropertyStructure[] | undefined;
    staticMethods?: ClassStaticMethodStructure[] | undefined;
    staticProperties?: ClassStaticPropertyStructure[] | undefined;
    constructorDef?: ClassConstructorStructure | undefined;
    extendsTypes?: string[] | undefined;
    implementsTypes?: string[] | undefined;
}

export interface EnumStructure extends BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure {
    isConst?: boolean | undefined;
    members?: EnumMemberStructure[] | undefined;
}

export interface EnumMemberStructure extends BaseStructure, NamedStructure {
    value: number;
}

export interface FileStructure extends BaseStructure, ModuledStructure {
    imports?: ImportStructure[] | undefined;
    reExports?: ReExportStructure[] | undefined;
    fileName?: string | undefined;
    defaultExportExpression?: string | undefined;
}

export interface NamedImportPartStructure {
    name: string;
    alias?: string | undefined;
}

export interface ImportStructure extends BaseStructure {
    moduleSpecifier: string;
    starImportName?: string | undefined;
    defaultImportName?: string | undefined;
    namedImports?: NamedImportPartStructure[] | undefined;
}

export interface ReExportStructure extends BaseStructure {
    moduleSpecifier: string;
    namedExports?: NamedImportPartStructure[] | undefined;
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
    callSignatures?: CallSignatureStructure[] | undefined;
    extendsTypes?: string[] | undefined;
    methods?: InterfaceMethodStructure[] | undefined;
    newSignatures?: CallSignatureStructure[] | undefined;
    properties?: InterfacePropertyStructure[] | undefined;
}

export interface NamespaceStructure extends BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure {
    declarationType?: "namespace" | "module" | undefined;
}

export interface VariableStructure extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType?: "var" | "let" | "const" | undefined;
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
