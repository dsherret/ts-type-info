import CodeBlockWriter from "code-block-writer";
import * as ts from "typescript";

export function getInfoFromFiles(fileNames: string[], options?: Options | undefined): GlobalDefinition;

export function getInfoFromString(code: string, options?: Options | undefined): FileDefinition;

export interface Options {
    compilerOptions?: CompilerOptions | undefined;
    showDebugMessages?: boolean | undefined;
    includeTsNodes?: boolean | undefined;
}

export interface CompilerOptions {
    [option: string]: string | number | boolean | string[] | (string | number)[] | undefined;
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

    constructor();
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

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition, ReadonlyableDefinition {
    name: string;
    isOptional: boolean;
    type: TypeDefinition;
    isReadonly: boolean;

    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];

    addTypeParameter(structure: TypeParameterStructure): TypeParameterDefinition;
    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)): TypeParameterDefinition | null;
}

export abstract class BaseObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
}

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> extends BaseDefinition implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition, ThisTypedDefinition, NodedDefinition, OverloadSignaturedDefinition {
    isGenerator: boolean;
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;
    name: string;
    parameters: ParameterType[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType | null;
    thisType: TypeDefinition | null;
    setThisType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[] | undefined) => this;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    tsNode?: ts.Node | undefined;
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => CallSignatureDefinition | null;

    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition, NodedDefinition {
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[];
    name: string | null;
    isOptional: boolean;
    type: TypeDefinition;
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
    tsNode?: ts.Node | undefined;

    addDestructuringProperty(structure: ObjectPropertyStructure): ObjectPropertyDefinition;
    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)): ObjectPropertyDefinition | null;
    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[];

    abstract addParameter(structure: ParameterStructureType): ParameterType;
    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)): ParameterType | null;
}

export abstract class ReadonlyableDefinition {
    isReadonly: boolean;
}

export abstract class ReturnTypedDefinition {
    returnType: TypeDefinition;

    setReturnType(text: string): this;
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
    directlyContains(def: ExportableDefinitions): boolean;
    getNamespacesToDefinition(searchDef: ExportableDefinitions): NamespaceDefinition[] | null;
    getExports(): ExportableDefinitions[];
    getMembers(): ExportableDefinitions[];
    setOrderOfMember(order: number, member: ExportableDefinitions): this;
}

export abstract class NodedDefinition {
    tsNode?: ts.Node | undefined;
}

export abstract class OverloadSignaturedDefinition {
    overloadSignatures: CallSignatureDefinition[];

    addOverloadSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean): CallSignatureDefinition | null;
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition, NodedDefinition {
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition | null;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    tsNode?: ts.Node | undefined;

    addParameter(structure: CallSignatureParameterStructure): CallSignatureParameterDefinition;
    getMinArgumentCount(): number;
}

export class CallSignatureParameterDefinition extends BaseParameterDefinition {
}

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition, ReadonlyableDefinition {
    keyName: string;
    keyType: TypeDefinition;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    isReadonly: boolean;
}

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    constraintType: TypeDefinition | null;
    name: string;
    tsNode?: ts.Node | undefined;
}

export class TypePropertyDefinition extends BasePropertyDefinition implements NodedDefinition {
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, AmbientableDefinition, ExportableDefinition, OrderableDefinition, TypedDefinition, TypeParameteredDefinition, NodedDefinition {
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
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    tsNode?: ts.Node | undefined;

    write(writeOptions?: WriteOptions | undefined): string;
    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    arguments: ExpressionDefinition[];
    name: string;
    tsNode?: ts.Node | undefined;

    addArgument(text: string): TypeDefinition;
}

export class ObjectPropertyDefinition extends BaseObjectPropertyDefinition implements NodedDefinition {
}

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    parameterName: string;
    type: TypeDefinition;
}

export class BaseExpressionDefinition extends BaseDefinition {
    text: string;
}

export abstract class BaseTypeDefinition extends BaseExpressionDefinition {
    arrayElementType: TypeDefinition | null;
    intersectionTypes: TypeDefinition[];
    unionTypes: TypeDefinition[];
    definitions: ExportableDefinitions[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeDefinition[];
    text: string;

    getAllDefinitions(): ExportableDefinitions[];
    getIntersectionType(searchFunction: (definition: TypeDefinition) => boolean): TypeDefinition | null;
    getUnionType(searchFunction: (definition: TypeDefinition) => boolean): TypeDefinition | null;
    getDefinition(searchFunction: (definition: ExportableDefinitions) => boolean): ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | null;
    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)): TypePropertyDefinition | null;
    getTypeArgument(searchFunction: (typeArgument: TypeDefinition) => boolean): TypeDefinition | null;
    isArrayType(): boolean;
}

export class ExpressionDefinition extends BaseExpressionDefinition {
}

export class TypeDefinition extends BaseTypeDefinition {
    callSignatures: CallSignatureDefinition[];
    node: TypeNodeDefinition | null;

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean): CallSignatureDefinition | null;
}

export class TypeNodeDefinition extends BaseTypeDefinition implements TypeParameteredDefinition, ParameteredDefinition<TypeFunctionParameterDefinition, TypeFunctionParameterStructure>, NodedDefinition {
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    parameters: TypeFunctionParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: TypeFunctionParameterDefinition) => boolean)) => TypeFunctionParameterDefinition | null;
    addParameter: (structure: TypeFunctionParameterStructure) => TypeFunctionParameterDefinition;
    tsNode?: ts.TypeNode | undefined;
}

export class TypeFunctionParameterDefinition extends BaseParameterDefinition {
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

    addParameter(structure: FunctionParameterStructure): FunctionParameterDefinition;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class FunctionParameterDefinition extends BaseParameterDefinition implements NodedDefinition {
    tsNode?: ts.Node | undefined;
}

export class BaseClassMethodParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ScopedDefinition, NodedDefinition {
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    scope: Scope;
    tsNode?: ts.Node | undefined;
}

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType> extends BaseFunctionDefinition<ParameterType, ParameterStructureType> implements AsyncableDefinition, DecoratableDefinition, ScopedDefinition, FunctionBodyWriteableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    scope: Scope;

    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export class BaseClassPropertyDefinition extends BaseObjectPropertyDefinition implements DecoratableDefinition, ScopedDefinition, NodedDefinition {
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    scope: Scope;
    tsNode?: ts.Node | undefined;
}

export abstract class ScopedDefinition {
    scope: Scope;
}

export class ClassDefinition extends BaseDefinition implements NamedDefinition, DecoratableDefinition, OrderableDefinition, NodedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition {
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
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    tsNode?: ts.Node | undefined;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isAbstract: boolean;

    write(writeOptions?: WriteOptions | undefined): string;
    addMethod(structure: ClassMethodStructure): ClassMethodDefinition;
    addProperty(structure: ClassPropertyStructure): ClassPropertyDefinition;
    addStaticMethod(structure: ClassStaticMethodStructure): ClassStaticMethodDefinition;
    addStaticProperty(structure: ClassStaticPropertyStructure): ClassStaticPropertyDefinition;
    addExtends(definition: ClassDefinition, typeArguments?: string[] | undefined): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addImplements(definition: ClassDefinition | InterfaceDefinition, typeArguments?: string[] | undefined): TypeDefinition;
    addImplements(text: string): TypeDefinition;
    getPropertiesAndConstructorParameters(): (ClassPropertyDefinition | ClassConstructorParameterDefinition)[];
    getMethod(nameOrSearchFunction: string | ((method: ClassMethodDefinition) => boolean)): ClassMethodDefinition | null;
    getStaticMethod(nameOrSearchFunction: string | ((staticMethod: ClassStaticMethodDefinition) => boolean)): ClassStaticMethodDefinition | null;
    getProperty(nameOrSearchFunction: string | ((property: ClassPropertyDefinition) => boolean)): ClassPropertyDefinition | null;
    getStaticProperty(nameOrSearchFunction: string | ((staticProperty: ClassStaticPropertyDefinition) => boolean)): ClassStaticPropertyDefinition | null;
    setConstructor(structure: ClassConstructorStructure): this;
}

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure> implements AbstractableDefinition {
    isAbstract: boolean;

    addParameter(structure: ClassMethodParameterStructure): ClassMethodParameterDefinition;
}

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition {
}

export class ClassPropertyDefinition extends BaseClassPropertyDefinition implements AbstractableDefinition {
    kind: ClassPropertyKind;
    isConstructorParameter: boolean;
    onWriteGetBody: ((writer: CodeBlockWriter) => void) | null;
    onWriteSetBody: ((writer: CodeBlockWriter) => void) | null;
    isAbstract: boolean;
}

export enum ClassPropertyKind {
    Normal = 0,
    GetAccessor = 1,
    SetAccessor = 2,
    GetSetAccessor = 3
}

export class ClassConstructorDefinition extends BaseDefinition implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition, ScopedDefinition, NodedDefinition, OverloadSignaturedDefinition {
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => ClassConstructorParameterDefinition | null;
    scope: Scope;
    tsNode?: ts.Node | undefined;
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => CallSignatureDefinition | null;

    addParameter(structure: ClassConstructorParameterStructure): ClassConstructorParameterDefinition;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ReadonlyableDefinition, NodedDefinition {
    scope: ClassConstructorParameterScope;
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    isReadonly: boolean;
    tsNode?: ts.Node | undefined;

    toClassProperty(): ClassPropertyDefinition;
}

export type ClassConstructorParameterScope = "public" | "protected" | "private" | "none";

export const ClassConstructorParameterScope: { None: ClassConstructorParameterScope; Public: ClassConstructorParameterScope; Protected: ClassConstructorParameterScope; Private: ClassConstructorParameterScope; toScope(scope: ClassConstructorParameterScope): Scope; };

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    addParameter(structure: ClassStaticMethodParameterStructure): ClassStaticMethodParameterDefinition;
}

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
}

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition {
}

export type Scope = "public" | "protected" | "private";

export const Scope: { Public: Scope; Protected: Scope; Private: Scope; };

export class InterfaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition {
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
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    tsNode?: ts.Node | undefined;

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

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition implements NodedDefinition {
    tsNode?: ts.Node | undefined;
}

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    addParameter(structure: InterfaceMethodParameterStructure): InterfaceMethodParameterDefinition;
}

export class InterfacePropertyDefinition extends BasePropertyDefinition implements NodedDefinition {
    tsNode?: ts.Node | undefined;
}

export class EnumDefinition extends BaseDefinition implements AmbientableDefinition, ExportableDefinition, OrderableDefinition, NodedDefinition {
    isConst: boolean;
    members: EnumMemberDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    tsNode?: ts.Node | undefined;

    addMember(structure: EnumMemberStructure): EnumMemberDefinition;
    getMember(nameOrSearchFunction: string | ((member: EnumMemberDefinition) => boolean)): EnumMemberDefinition | null;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    value: number;
    name: string;
    tsNode?: ts.Node | undefined;
}

export type NamespaceDeclarationType = "namespace" | "module";

export const NamespaceDeclarationType: { Namespace: NamespaceDeclarationType; Module: NamespaceDeclarationType; };

export class NamespaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition {
    declarationType: NamespaceDeclarationType;
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
    getExports: () => ExportableDefinitions[];
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
    directlyContains: (def: ExportableDefinitions) => boolean;
    getNamespacesToDefinition: (searchDef: ExportableDefinitions) => NamespaceDefinition[] | null;
    getMembers: () => ExportableDefinitions[];
    setOrderOfMember: (order: number, member: ExportableDefinitions) => this;
    order: number;
    tsNode?: ts.Node | undefined;

    write(writeOptions?: WriteOptions | undefined): string;
}

export class FileDefinition extends BaseDefinition implements ModuledDefinition, NodedDefinition {
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
    directlyContains: (def: ExportableDefinitions) => boolean;
    getNamespacesToDefinition: (searchDef: ExportableDefinitions) => NamespaceDefinition[] | null;
    getMembers: () => ExportableDefinitions[];
    setOrderOfMember: (order: number, member: ExportableDefinitions) => this;
    tsNode?: ts.SourceFile | undefined;

    addImport(structure: ImportStructure): ImportDefinition;
    addReExport(structure: ReExportStructure): ReExportDefinition;
    getModuleSpecifierToFile(file: FileDefinition): string;
    getImport(searchFunction: (importDef: ImportDefinition) => boolean): ImportDefinition | null;
    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean): ReExportDefinition | null;
    getExports(): ExportableDefinitions[];
    write(writeOptions?: WriteOptions | undefined): string;
    writeExportsAsDefinitionFile(options: { imports: ImportStructure[]; writeOptions?: WriteOptions | undefined; }): string;
}

export class ImportDefinition extends BaseDefinition implements NodedDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string | null;
    defaultImport: DefaultImportPartDefinition | null;
    namedImports: NamedImportPartDefinition[];
    starImports: StarImportPartDefinition[];
    tsNode?: ts.Node | undefined;

    addNamedImport(structure: NamedImportPartStructure): NamedImportPartDefinition;
    getNamedImport(searchFunction: (importPart: NamedImportPartDefinition) => boolean): NamedImportPartDefinition | null;
    getStarImport(searchFunction: (importPart: StarImportPartDefinition) => boolean): StarImportPartDefinition | null;
    setDefaultImport(importName: string): this;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class ReExportDefinition extends BaseDefinition implements NodedDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: StarImportPartDefinition[];
    namedExports: NamedImportPartDefinition[];

    getExports(): ExportableDefinitions[];
    addNamedExport(structure: NamedImportPartStructure): NamedImportPartDefinition;
    getNamedExport(searchFunction: (exportPart: NamedImportPartDefinition) => boolean): NamedImportPartDefinition | null;
    getStarExport(searchFunction: (exportPart: StarImportPartDefinition) => boolean): StarImportPartDefinition | null;
    write(writeOptions?: WriteOptions | undefined): string;
}

export class NamedImportPartDefinition extends BaseDefinition implements NodedDefinition {
    definitions: ExportableDefinitions[];
    expression: ExpressionDefinition | null;
    alias: string | null;
    name: string;
}

export class StarImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[];
    expression: ExpressionDefinition | null;
    name: string;
}

export class DefaultImportPartDefinition extends BaseDefinition implements NodedDefinition {
    definitions: ExportableDefinitions[];
    expression: ExpressionDefinition | null;
    name: string;
    tsNode?: ts.Node | undefined;
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition {
    declarationType: VariableDeclarationType;
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
    tsNode?: ts.Node | undefined;

    write(writeOptions?: WriteOptions | undefined): string;
    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export type VariableDeclarationType = "var" | "let" | "const";

export const VariableDeclarationType: { Var: VariableDeclarationType; Let: VariableDeclarationType; Const: VariableDeclarationType; };

export class GlobalDefinition {
    files: FileDefinition[];
    typeChecker?: ts.TypeChecker | undefined;

    addDefinitionAsImportToFile(opts: { definition: ExportableDefinitions; file: FileDefinition; alias?: string | undefined; }): void;
    addFile(structure: FileStructure): FileDefinition;
    getFile(fileNameOrSearchFunction: string | ((file: FileDefinition) => boolean)): FileDefinition | null;
    getFileOfDefinition(def: ExportableDefinitions): FileDefinition | null;
    getFileAndNamespacesToDefinition(def: ExportableDefinitions): { file: FileDefinition; namespaces: NamespaceDefinition[]; } | null;
    renameDefinitionAs(definition: ExportableDefinitions, newName: string): void;
}

export type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassConstructorParameterDefinition | ClassMethodParameterDefinition;

export type TypeParameteredDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | TypeAliasDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition;

export type ModuledDefinitions = NamespaceDefinition | FileDefinition;

export type WriteableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | FileDefinition;

export type ExportableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

export type NodeDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition | ImportDefinition | ReExportDefinition;

export type ModuleMemberDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;

export type BaseFunctionDefinitions = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition;

export type FunctionBodyWriteableDefinitions = FunctionDefinition | ClassConstructorDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition;

export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;

export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;

export type ParameterDefinitions = ClassConstructorParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition | TypeFunctionParameterDefinition | FunctionParameterDefinition | CallSignatureParameterDefinition | InterfaceMethodParameterDefinition;

export type ParameteredDefinitions = CallSignatureDefinition | FunctionDefinition | ClassConstructorDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | TypeNodeDefinition | InterfaceMethodDefinition;

export type PropertyDefinitions = ClassPropertyDefinition | ClassStaticPropertyDefinition | InterfacePropertyDefinition;

export type MethodDefinitions = ClassMethodDefinition | InterfaceMethodDefinition;

export type MethodParameterDefinitions = ClassMethodParameterDefinition | InterfaceMethodParameterDefinition;

export abstract class BaseError extends Error {
    constructor(message: string);
}

export class ArgumentTypeError extends BaseError {
    constructor(argName: string, expectedType: string);

    readonly argName: string;
    readonly expectedType: string;
}

export class FileNotFoundError extends BaseError {
    constructor(fileName: string);

    readonly fileName: string;
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

export interface BasePropertyStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure, ReadonlyableStructure {
}

export interface TypeParameteredStructure {
    typeParameters?: TypeParameterStructure[] | undefined;
}

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends BaseStructure, NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure, OverloadSignaturedStructure {
    isGenerator?: boolean | undefined;
}

export interface BaseParameterStructure extends BaseStructure, OptionallyNamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure {
    isRestParameter?: boolean | undefined;
    destructuringProperties?: ObjectPropertyStructure[] | undefined;
}

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: T[] | undefined;
}

export interface ReadonlyableStructure {
    isReadonly?: boolean | undefined;
}

export interface ReturnTypedStructure {
    returnType?: string | undefined;
}

export interface OverloadSignaturedStructure {
    overloadSignatures?: CallSignatureStructure[] | undefined;
}

export interface CallSignatureStructure extends BaseStructure, TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure {
}

export interface CallSignatureParameterStructure extends BaseParameterStructure {
}

export interface DecoratorStructure extends BaseStructure, NamedStructure {
    arguments?: string[] | undefined;
}

export interface IndexSignatureStructure extends BaseStructure, ReturnTypedStructure, ReadonlyableStructure {
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

export interface ClassPropertyStructure extends BaseClassPropertyStructure, AbstractableStructure {
    kind?: ClassPropertyKind | undefined;
    onWriteGetBody?: ((writer: CodeBlockWriter) => void) | undefined;
    onWriteSetBody?: ((writer: CodeBlockWriter) => void) | undefined;
}

export interface ClassConstructorStructure extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure>, FunctionBodyWriteableStructure, ScopedStructure {
}

export interface ClassConstructorParameterStructure extends BaseParameterStructure, ReadonlyableStructure {
    scope?: "public" | "protected" | "private" | "none" | undefined;
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

export interface TypeFunctionParameterStructure extends BaseParameterStructure {
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
