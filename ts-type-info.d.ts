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
    isFunctionDefinition(): this is FunctionDefinition;
    isFileDefinition(): this is FileDefinition;
    isImportDefinition(): this is ImportDefinition;
    isInterfaceDefinition(): this is InterfaceDefinition;
    isInterfaceMethodDefinition(): this is InterfaceMethodDefinition;
    isInterfacePropertyDefinition(): this is InterfacePropertyDefinition;
    isNamespaceDefinition(): this is NamespaceDefinition;
    isReExportDefinition(): this is ReExportDefinition;
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
    ObjectPropertyDefinition = 1500
}

export class FunctionBodyWriteableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
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

export abstract class AsyncableDefinition {
    isAsync: boolean;
}

export abstract class TypeExpressionedDefinition {
    typeExpression: TypeExpressionDefinition;

    setTypeExpression(text: string): any;
}

export abstract class DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;

    setDefaultExpression(text: string): any;
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
    directlyContains(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): boolean;
    getNamespacesToDefinition(searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): NamespaceDefinition[];
    getExports(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    getMembers(): (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
}

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition {
    isOptional: boolean;
    name: string;
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => any;

    constructor(definitionType: DefinitionType);
}

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];

    addTypeParameters(...typeParameters: TypeParameterStructure[]): this;
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
    returnTypeExpression: TypeExpressionDefinition;
    setReturnTypeExpression: (text: string) => any;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor(definitionType: DefinitionType);

    addOverloadSignatures(...overloadSignatures: CallSignatureStructure[]): this;
    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    abstract addParameters(...parameters: ParameterStructureType[]): this;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[];
    name: string;
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => any;
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;

    constructor(definitionType: DefinitionType);

    addDestructuringProperties(...properties: ObjectPropertyStructure[]): any;
    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)): ObjectPropertyDefinition;
}

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[];

    abstract addParameters(...parameters: ParameterStructureType[]): this;
    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)): ParameterType;
}

export abstract class ReturnTypedDefinition {
    returnTypeExpression: TypeExpressionDefinition;

    setReturnTypeExpression(text: string): any;
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition;
    returnTypeExpression: TypeExpressionDefinition;
    setReturnTypeExpression: (text: string) => any;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;

    constructor();

    addParameters(...parameters: CallSignatureParameterStructure[]): this;
    getMinArgumentCount(): number;
}

export class CallSignatureParameterDefinition extends BaseParameterDefinition {
    constructor();
}

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition {
    keyName: string;
    keyTypeExpression: TypeExpressionDefinition;
    returnTypeExpression: TypeExpressionDefinition;
    setReturnTypeExpression: (text: string) => any;

    constructor();
}

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintTypeExpression: TypeExpressionDefinition;
    name: string;

    constructor();
}

export class TypePropertyDefinition extends BasePropertyDefinition {
    constructor();
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition {
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => any;
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    write(): string;
}

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[];
    name: string;

    constructor();

    addArguments(...args: string[]): this;
}

export class ObjectPropertyDefinition extends BaseObjectPropertyDefinition {
    constructor();
}

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    parameterName: string;
    type: TypeDefinition;

    constructor();
}

export class ExpressionDefinition extends BaseDefinition {
    text: string;

    constructor();
}

export class TypeDefinition {
    callSignatures: CallSignatureDefinition[];
    definitions: (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeDefinition[];
    text: string;

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    getDefinition(searchFunction: (definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean): ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)): TypePropertyDefinition;
    getTypeArgument(searchFunction: (typeArgument: TypeDefinition) => boolean): TypeDefinition;
}

export class TypeExpressionDefinition extends ExpressionDefinition {
    types: TypeDefinition[];

    getType(searchFunction: (typeDefinition: TypeDefinition) => boolean): TypeDefinition;
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

    addParameters(...parameters: FunctionParameterStructure[]): this;
    write(): string;
}

export class FunctionParameterDefinition extends BaseParameterDefinition {
    constructor();
}

export class BaseClassMethodParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ScopedDefinition {
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";

    constructor(definitionType: DefinitionType);
}

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType> extends BaseFunctionDefinition<ParameterType, ParameterStructureType> implements AsyncableDefinition, DecoratableDefinition, ScopedDefinition, FunctionBodyWriteableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    scope: "public" | "protected" | "private";

    constructor(definitionType: DefinitionType);

    abstract addParameters(...parameters: ParameterStructureType[]): this;
}

export class BaseClassPropertyDefinition extends BaseObjectPropertyDefinition implements DecoratableDefinition, ScopedDefinition {
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
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

    constructor();

    write(): string;
    addMethods(...methods: ClassMethodStructure[]): this;
    addProperties(...properties: ClassPropertyStructure[]): this;
    addStaticMethods(...staticMethods: ClassStaticMethodStructure[]): this;
    addStaticProperties(...staticProperties: ClassStaticPropertyStructure[]): this;
    addExtends(...texts: string[]): this;
    addImplements(...texts: string[]): this;
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

    addParameters(...parameters: ClassMethodParameterStructure[]): this;
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

    addParameters(...parameters: ClassConstructorParameterStructure[]): this;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition {
    scope: "none" | "public" | "protected" | "private";
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;

    constructor();

    toClassProperty(): ClassPropertyDefinition;
}

export type ClassConstructorParameterScope = "none" | "public" | "protected" | "private";

export const ClassConstructorParameterScope: { None: "none" | "public" | "protected" | "private"; Public: "none" | "public" | "protected" | "private"; Protected: "none" | "public" | "protected" | "private"; Private: "none" | "public" | "protected" | "private"; toScope(scope: "none" | "public" | "protected" | "private"): "public" | "protected" | "private"; };

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    constructor();

    addParameters(...parameters: ClassStaticMethodParameterStructure[]): this;
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

    constructor();

    addCallSignatures(...callSignatures: CallSignatureStructure[]): this;
    addExtends(...texts: string[]): this;
    addIndexSignatures(...indexSignatures: IndexSignatureStructure[]): this;
    addMethods(...methods: InterfaceMethodStructure[]): this;
    addNewSignatures(...newSignatures: CallSignatureStructure[]): this;
    addProperties(...properties: InterfacePropertyStructure[]): this;
    getCallSignature(searchFunction: (callSignature: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    getIndexSignature(searchFunction: (indexSignature: IndexSignatureDefinition) => boolean): IndexSignatureDefinition;
    getMethod(nameOrSearchFunction: string | ((method: InterfaceMethodDefinition) => boolean)): InterfaceMethodDefinition;
    getNewSignature(searchFunction: (newSignature: CallSignatureDefinition) => boolean): CallSignatureDefinition;
    getProperty(nameOrSearchFunction: string | ((property: InterfacePropertyDefinition) => boolean)): InterfacePropertyDefinition;
    write(): string;
}

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition {
    constructor();
}

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    constructor();

    addParameters(...parameters: InterfaceMethodParameterStructure[]): this;
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

    addMembers(...members: EnumMemberStructure[]): this;
    getMember(nameOrSearchFunction: string | ((member: EnumMemberDefinition) => boolean)): EnumMemberDefinition;
    write(): string;
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
    directlyContains: (def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean;
    getNamespacesToDefinition: (searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => NamespaceDefinition[];
    getMembers: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

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
    directlyContains: (def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => boolean;
    getNamespacesToDefinition: (searchDef: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition) => NamespaceDefinition[];
    getMembers: () => (ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition)[];

    constructor();

    addImports(...imports: ImportStructure[]): this;
    addReExports(...reExports: ReExportStructure[]): this;
    getModuleSpecifierToFile(file: FileDefinition): string;
    getImport(searchFunction: (importDef: ImportDefinition) => boolean): ImportDefinition;
    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean): ReExportDefinition;
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

    constructor();

    addNamedImports(...namedImports: (NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions)[]): this;
    getNamedImport(searchFunction: (importPart: ImportPartDefinition) => boolean): ImportPartDefinition;
    getStarImport(searchFunction: (importPart: ImportPartDefinition) => boolean): ImportPartDefinition;
    setDefaultImport(importName: string): this;
    write(): string;
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
    addNamedExports(...namedExports: (NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions)[]): this;
    getNamedExport(searchFunction: (exportPart: ReExportPartDefinition) => boolean): ReExportPartDefinition;
    getStarExport(searchFunction: (exportPart: ReExportPartDefinition) => boolean): ReExportPartDefinition;
    write(): string;
}

export class ReExportPartDefinition extends BaseImportPartDefinition {
    exportName: string;

    constructor();
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition {
    declarationType: "var" | "let" | "const";
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => any;
    defaultExpression: ExpressionDefinition;
    setDefaultExpression: (text: string) => any;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    constructor();

    write(): string;
}

export type VariableDeclarationType = "var" | "let" | "const";

export const VariableDeclarationType: { Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; };

export class GlobalDefinition {
    files: FileDefinition[];

    addDefinitionAsImportToFile(opts: { definition: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition; file: FileDefinition; alias?: string; }): void;
    addFiles(...files: FileStructure[]): this;
    getFile(fileNameOrSearchFunction: string | ((file: FileDefinition) => boolean)): FileDefinition;
    getFileOfDefinition(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): FileDefinition;
    getFileAndNamespacesToDefinition(def: ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition): { file: FileDefinition; namespaces: NamespaceDefinition[]; };
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

export class BaseError extends Error {
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

export interface BaseObjectPropertyStructure extends BasePropertyStructure, DefaultExpressionedStructure {
}

export interface TypeExpressionedStructure {
    type?: string;
}

export interface BasePropertyStructure extends BaseStructure, NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
}

export interface TypeParameteredStructure {
    typeParameters?: TypeParameterStructure[];
}

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends BaseStructure, NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure {
    isGenerator?: boolean;
    overloadSignatures?: CallSignatureStructure[];
}

export interface BaseParameterStructure extends BaseStructure, NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
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

export interface TypeAliasStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeExpressionedStructure, TypeParameteredStructure, AmbientableStructure {
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

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: string[];
    definitions?: NamedStructure[];
    text: string;
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

export interface VariableStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure {
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
