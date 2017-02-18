import CodeBlockWriter from "code-block-writer";
import * as ts from "typescript";

export function getInfoFromFiles(fileNames: string[], options?: undefined | Options): GlobalDefinition;

export function getInfoFromString(code: string, options?: undefined | Options): FileDefinition;

export interface Options {
    compilerOptions?: undefined | CompilerOptions;
    compilerHost?: undefined | ts.CompilerHost;
    tsConfigFilePath?: undefined | string;
    showDebugMessages?: undefined | true | false;
    includeTsNodes?: undefined | true | false;
}

export interface CompilerOptions extends ts.CompilerOptions {
}

export interface WriteOptions {
    newLine?: undefined | string;
    indentNumberOfSpaces?: undefined | number;
    useTabs?: undefined | true | false;
}

export abstract class BaseDefinition {
    onBeforeWrite: null | ((writer: CodeBlockWriter) => void);
    onAfterWrite: null | ((writer: CodeBlockWriter) => void);
}

export class FunctionBodyWriteableDefinition {
    onWriteFunctionBody: null | ((writer: CodeBlockWriter) => void);
}

export abstract class NamedDefinition {
    name: string;
}

export abstract class OptionallyNamedDefinition {
    name: null | string;
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

export abstract class DocumentationedDefinition {
    documentationComment: string;
}

export abstract class ThisTypedDefinition {
    thisType: null | TypeDefinition;

    setThisType(definition: NamedDefinition, typeArguments?: undefined | string[]): this;
    setThisType(text: string): this;
}

export abstract class TypedDefinition {
    type: TypeDefinition;

    setType(definition: NamedDefinition, typeArguments?: undefined | string[]): this;
    setType(text: string): this;
}

export abstract class DefaultExpressionedDefinition {
    defaultExpression: null | ExpressionDefinition;

    setDefaultExpression(text: string): this;
}

export abstract class DecoratableDefinition {
    decorators: DecoratorDefinition[];

    addDecorator(structure: DecoratorStructure): DecoratorDefinition;
    getDecorator(nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)): null | DecoratorDefinition;
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
    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)): null | TypeParameterDefinition;
}

export abstract class BaseObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    defaultExpression: null | ExpressionDefinition;
    setDefaultExpression: (text: string) => this;
}

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> extends BaseDefinition implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition, ThisTypedDefinition, NodedDefinition, OverloadSignaturedDefinition, DocumentationedDefinition {
    isGenerator: boolean;
    userDefinedTypeGuard: null | UserDefinedTypeGuardDefinition;
    name: string;
    parameters: ParameterType[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType | null;
    thisType: null | TypeDefinition;
    setThisType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[] | undefined) => this;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    tsNode?: undefined | ts.Node;
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => CallSignatureDefinition | null;
    documentationComment: string;

    setUserDefinedTypeGuard(structure: UserDefinedTypeGuardStructure): this;
    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition, NodedDefinition {
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[];
    name: null | string;
    isOptional: boolean;
    type: TypeDefinition;
    defaultExpression: null | ExpressionDefinition;
    setDefaultExpression: (text: string) => this;
    tsNode?: undefined | ts.Node;

    addDestructuringProperty(structure: ObjectPropertyStructure): ObjectPropertyDefinition;
    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)): null | ObjectPropertyDefinition;
    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[];

    abstract addParameter(structure: ParameterStructureType): ParameterType;
    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)): null | ParameterType;
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
    getClass(nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)): null | ClassDefinition;
    getEnum(nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)): null | EnumDefinition;
    getFunction(nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)): null | FunctionDefinition;
    getInterface(nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)): null | InterfaceDefinition;
    getNamespace(nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)): null | NamespaceDefinition;
    getTypeAlias(nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)): null | TypeAliasDefinition;
    getVariable(nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)): null | VariableDefinition;
    directlyContains(def: ExportableDefinitions): boolean;
    getNamespacesToDefinition(searchDef: ExportableDefinitions): null | NamespaceDefinition[];
    getExports(): ExportableDefinitions[];
    getMembers(): ExportableDefinitions[];
    setOrderOfMember(order: number, member: ExportableDefinitions): this;
}

export abstract class NodedDefinition {
    tsNode?: undefined | ts.Node;
}

export abstract class OverloadSignaturedDefinition {
    overloadSignatures: CallSignatureDefinition[];

    addOverloadSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean): null | CallSignatureDefinition;
}

export class CallSignatureDefinition extends BaseDefinition implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition, NodedDefinition, DocumentationedDefinition {
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition | null;
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    tsNode?: undefined | ts.Node;
    documentationComment: string;

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

    setKeyType(text: string): this;
}

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    constraintType: null | TypeDefinition;
    name: string;
    tsNode?: undefined | ts.Node;

    setConstraintType(definition: NamedDefinition, typeArguments?: undefined | string[]): this;
    setConstraintType(text: string): this;
}

export class TypePropertyDefinition extends BasePropertyDefinition implements NodedDefinition {
}

export class TypeAliasDefinition extends BaseDefinition implements NamedDefinition, AmbientableDefinition, ExportableDefinition, OrderableDefinition, TypedDefinition, TypeParameteredDefinition, NodedDefinition, DocumentationedDefinition {
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
    tsNode?: undefined | ts.Node;
    documentationComment: string;

    write(writeOptions?: undefined | WriteOptions): string;
    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    arguments: ExpressionDefinition[];
    isDecoratorFactory: boolean;
    name: string;
    tsNode?: undefined | ts.Node;

    addArgument(text: string): TypeDefinition;
}

export class ObjectPropertyDefinition extends BaseObjectPropertyDefinition implements NodedDefinition {
}

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    parameterName: null | string;
    type: TypeDefinition;
}

export class BaseExpressionDefinition extends BaseDefinition {
    text: string;
}

export abstract class BaseTypeDefinition extends BaseExpressionDefinition {
    arrayElementType: null | TypeDefinition;
    intersectionTypes: TypeDefinition[];
    unionTypes: TypeDefinition[];
    definitions: (EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition)[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeDefinition[];
    text: string;

    getAllDefinitions(): (EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition)[];
    getIntersectionType(searchFunction: (definition: TypeDefinition) => boolean): null | TypeDefinition;
    getUnionType(searchFunction: (definition: TypeDefinition) => boolean): null | TypeDefinition;
    getDefinition(searchFunction: (definition: EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition) => boolean): null | EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition;
    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)): null | TypePropertyDefinition;
    getTypeArgument(searchFunction: (typeArgument: TypeDefinition) => boolean): null | TypeDefinition;
    isArrayType(): boolean;
}

export class ExpressionDefinition extends BaseExpressionDefinition {
}

export class TypeDefinition extends BaseTypeDefinition {
    callSignatures: CallSignatureDefinition[];
    node: null | TypeNodeDefinition;

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean): null | CallSignatureDefinition;
}

export class TypeNodeDefinition extends BaseTypeDefinition implements TypeParameteredDefinition, ParameteredDefinition<TypeFunctionParameterDefinition, TypeFunctionParameterStructure>, NodedDefinition {
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    parameters: TypeFunctionParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: TypeFunctionParameterDefinition) => boolean)) => TypeFunctionParameterDefinition | null;
    addParameter: (structure: TypeFunctionParameterStructure) => TypeFunctionParameterDefinition;
    tsNode?: undefined | ts.TypeNode;
}

export class TypeFunctionParameterDefinition extends BaseParameterDefinition {
}

export class FunctionDefinition extends BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure> implements ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition, OrderableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: null | ((writer: CodeBlockWriter) => void);
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    order: number;

    addParameter(structure: FunctionParameterStructure): FunctionParameterDefinition;
    write(writeOptions?: undefined | WriteOptions): string;
}

export class FunctionParameterDefinition extends BaseParameterDefinition implements NodedDefinition {
    tsNode?: undefined | ts.Node;
}

export class BaseClassMethodParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ScopedDefinition, NodedDefinition {
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    scope: Scope;
    tsNode?: undefined | ts.Node;
}

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType> extends BaseFunctionDefinition<ParameterType, ParameterStructureType> implements AsyncableDefinition, DecoratableDefinition, ScopedDefinition, FunctionBodyWriteableDefinition {
    isAsync: boolean;
    onWriteFunctionBody: null | ((writer: CodeBlockWriter) => void);
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    scope: Scope;

    abstract addParameter(structure: ParameterStructureType): ParameterType;
}

export class BaseClassPropertyDefinition extends BaseObjectPropertyDefinition implements DecoratableDefinition, ScopedDefinition, NodedDefinition, DocumentationedDefinition {
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    scope: Scope;
    tsNode?: undefined | ts.Node;
    documentationComment: string;
}

export abstract class ScopedDefinition {
    scope: Scope;
}

export class ClassDefinition extends BaseDefinition implements NamedDefinition, DecoratableDefinition, OrderableDefinition, NodedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition, DocumentationedDefinition {
    methods: ClassMethodDefinition[];
    properties: ClassPropertyDefinition[];
    staticMethods: ClassStaticMethodDefinition[];
    staticProperties: ClassStaticPropertyDefinition[];
    constructorDef: null | ClassConstructorDefinition;
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
    tsNode?: undefined | ts.Node;
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition | null;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    isAbstract: boolean;
    documentationComment: string;

    write(writeOptions?: undefined | WriteOptions): string;
    addMethod(structure: ClassMethodStructure): ClassMethodDefinition;
    addProperty(structure: ClassPropertyStructure): ClassPropertyDefinition;
    addStaticMethod(structure: ClassStaticMethodStructure): ClassStaticMethodDefinition;
    addStaticProperty(structure: ClassStaticPropertyStructure): ClassStaticPropertyDefinition;
    addExtends(definition: ClassDefinition, typeArguments?: undefined | string[]): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addImplements(definition: ClassDefinition | InterfaceDefinition, typeArguments?: undefined | string[]): TypeDefinition;
    addImplements(text: string): TypeDefinition;
    getPropertiesAndConstructorParameters(): (ClassConstructorParameterDefinition | ClassPropertyDefinition)[];
    getMethod(nameOrSearchFunction: string | ((method: ClassMethodDefinition) => boolean)): null | ClassMethodDefinition;
    getStaticMethod(nameOrSearchFunction: string | ((staticMethod: ClassStaticMethodDefinition) => boolean)): null | ClassStaticMethodDefinition;
    getProperty(nameOrSearchFunction: string | ((property: ClassPropertyDefinition) => boolean)): null | ClassPropertyDefinition;
    getStaticProperty(nameOrSearchFunction: string | ((staticProperty: ClassStaticPropertyDefinition) => boolean)): null | ClassStaticPropertyDefinition;
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
    onWriteGetBody: null | ((writer: CodeBlockWriter) => void);
    onWriteSetBody: null | ((writer: CodeBlockWriter) => void);
    isAbstract: boolean;
}

export enum ClassPropertyKind {
    Normal = 0,
    GetAccessor = 1,
    SetAccessor = 2,
    GetSetAccessor = 3
}

export class ClassConstructorDefinition extends BaseDefinition implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition, ScopedDefinition, NodedDefinition, OverloadSignaturedDefinition, DocumentationedDefinition {
    onWriteFunctionBody: null | ((writer: CodeBlockWriter) => void);
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => ClassConstructorParameterDefinition | null;
    scope: Scope;
    tsNode?: undefined | ts.Node;
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => CallSignatureDefinition | null;
    documentationComment: string;

    addParameter(structure: ClassConstructorParameterStructure): ClassConstructorParameterDefinition;
}

export class ClassConstructorParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ReadonlyableDefinition, NodedDefinition {
    scope: ClassConstructorParameterScope;
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition | null;
    isReadonly: boolean;
    tsNode?: undefined | ts.Node;

    toClassProperty(): ClassPropertyDefinition;
}

export type ClassConstructorParameterScope = "none" | "public" | "private" | "protected";

export const ClassConstructorParameterScope: { None: ClassConstructorParameterScope; Public: ClassConstructorParameterScope; Protected: ClassConstructorParameterScope; Private: ClassConstructorParameterScope; toScope(scope: ClassConstructorParameterScope): Scope; };

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    addParameter(structure: ClassStaticMethodParameterStructure): ClassStaticMethodParameterDefinition;
}

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
}

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition {
}

export type Scope = "public" | "private" | "protected";

export const Scope: { Public: Scope; Protected: Scope; Private: Scope; };

export class InterfaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition, DocumentationedDefinition {
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
    tsNode?: undefined | ts.Node;
    documentationComment: string;

    addCallSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    addExtends(definition: ClassDefinition | InterfaceDefinition, typeArguments?: undefined | string[]): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addIndexSignature(structure: IndexSignatureStructure): IndexSignatureDefinition;
    addMethod(structure: InterfaceMethodStructure): InterfaceMethodDefinition;
    addNewSignature(structure: CallSignatureStructure): CallSignatureDefinition;
    addProperty(structure: InterfacePropertyStructure): InterfacePropertyDefinition;
    getCallSignature(searchFunction: (callSignature: CallSignatureDefinition) => boolean): null | CallSignatureDefinition;
    getIndexSignature(searchFunction: (indexSignature: IndexSignatureDefinition) => boolean): null | IndexSignatureDefinition;
    getMethod(nameOrSearchFunction: string | ((method: InterfaceMethodDefinition) => boolean)): null | InterfaceMethodDefinition;
    getNewSignature(searchFunction: (newSignature: CallSignatureDefinition) => boolean): null | CallSignatureDefinition;
    getProperty(nameOrSearchFunction: string | ((property: InterfacePropertyDefinition) => boolean)): null | InterfacePropertyDefinition;
    write(writeOptions?: undefined | WriteOptions): string;
}

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition implements NodedDefinition {
    tsNode?: undefined | ts.Node;
}

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    addParameter(structure: InterfaceMethodParameterStructure): InterfaceMethodParameterDefinition;
}

export class InterfacePropertyDefinition extends BasePropertyDefinition implements NodedDefinition, DocumentationedDefinition {
    tsNode?: undefined | ts.Node;
    documentationComment: string;
}

export class EnumDefinition extends BaseDefinition implements AmbientableDefinition, ExportableDefinition, OrderableDefinition, NodedDefinition, DocumentationedDefinition {
    isConst: boolean;
    members: EnumMemberDefinition[];
    name: string;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    tsNode?: undefined | ts.Node;
    documentationComment: string;

    addMember(structure: EnumMemberStructure): EnumMemberDefinition;
    getMember(nameOrSearchFunction: string | ((member: EnumMemberDefinition) => boolean)): null | EnumMemberDefinition;
    write(writeOptions?: undefined | WriteOptions): string;
}

export class EnumMemberDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition, DocumentationedDefinition {
    value: number;
    name: string;
    tsNode?: undefined | ts.Node;
    documentationComment: string;
}

export type NamespaceDeclarationType = "module" | "namespace";

export const NamespaceDeclarationType: { Namespace: NamespaceDeclarationType; Module: NamespaceDeclarationType; };

export class NamespaceDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition, DocumentationedDefinition {
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
    tsNode?: undefined | ts.Node;
    documentationComment: string;

    write(writeOptions?: undefined | WriteOptions): string;
}

export class FileDefinition extends BaseDefinition implements ModuledDefinition, NodedDefinition {
    fileName: string;
    imports: ImportDefinition[];
    reExports: ReExportDefinition[];
    defaultExportExpression: null | ExpressionDefinition;
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
    tsNode?: undefined | ts.SourceFile;

    addImport(structure: ImportStructure): ImportDefinition;
    addReExport(structure: ReExportStructure): ReExportDefinition;
    getModuleSpecifierToFile(file: FileDefinition): string;
    getImport(searchFunction: (importDef: ImportDefinition) => boolean): null | ImportDefinition;
    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean): null | ReExportDefinition;
    getExports(): ExportableDefinitions[];
    write(writeOptions?: undefined | WriteOptions): string;
    writeExportsAsDefinitionFile(options: { imports: ImportStructure[]; writeOptions?: WriteOptions | undefined; }): string;
}

export class ImportDefinition extends BaseDefinition implements NodedDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: null | string;
    defaultImport: null | DefaultImportPartDefinition;
    namedImports: NamedImportPartDefinition[];
    starImports: StarImportPartDefinition[];
    tsNode?: undefined | ts.Node;

    addNamedImport(structure: NamedImportPartStructure): NamedImportPartDefinition;
    getNamedImport(searchFunction: (importPart: NamedImportPartDefinition) => boolean): null | NamedImportPartDefinition;
    getStarImport(searchFunction: (importPart: StarImportPartDefinition) => boolean): null | StarImportPartDefinition;
    setDefaultImport(importName: string): this;
    write(writeOptions?: undefined | WriteOptions): string;
}

export class ReExportDefinition extends BaseDefinition implements NodedDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: StarImportPartDefinition[];
    namedExports: NamedImportPartDefinition[];

    getExports(): ExportableDefinitions[];
    addNamedExport(structure: NamedImportPartStructure): NamedImportPartDefinition;
    getNamedExport(searchFunction: (exportPart: NamedImportPartDefinition) => boolean): null | NamedImportPartDefinition;
    getStarExport(searchFunction: (exportPart: StarImportPartDefinition) => boolean): null | StarImportPartDefinition;
    write(writeOptions?: undefined | WriteOptions): string;
}

export class NamedImportPartDefinition extends BaseDefinition implements NodedDefinition {
    definitions: ExportableDefinitions[];
    expression: null | ExpressionDefinition;
    alias: null | string;
    name: string;
}

export class StarImportPartDefinition extends BaseDefinition {
    definitions: ExportableDefinitions[];
    expression: null | ExpressionDefinition;
    name: string;
}

export class DefaultImportPartDefinition extends BaseDefinition implements NodedDefinition {
    definitions: ExportableDefinitions[];
    expression: null | ExpressionDefinition;
    name: string;
    tsNode?: undefined | ts.Node;
}

export class VariableDefinition extends BaseDefinition implements NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition, DocumentationedDefinition {
    declarationType: VariableDeclarationType;
    name: string;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    defaultExpression: null | ExpressionDefinition;
    setDefaultExpression: (text: string) => this;
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    order: number;
    type: TypeDefinition;
    tsNode?: undefined | ts.Node;
    documentationComment: string;

    write(writeOptions?: undefined | WriteOptions): string;
    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
}

export type VariableDeclarationType = "const" | "var" | "let";

export const VariableDeclarationType: { Var: VariableDeclarationType; Let: VariableDeclarationType; Const: VariableDeclarationType; };

export class GlobalDefinition {
    files: FileDefinition[];
    typeChecker?: undefined | ts.TypeChecker;

    addDefinitionAsImportToFile(opts: { definition: EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition; file: FileDefinition; alias?: string | undefined; }): void;
    addFile(structure: FileStructure): FileDefinition;
    getFile(fileNameOrSearchFunction: string | ((file: FileDefinition) => boolean)): null | FileDefinition;
    getFileOfDefinition(def: ExportableDefinitions): null | FileDefinition;
    getFileAndNamespacesToDefinition(def: ExportableDefinitions): null | { file: FileDefinition; namespaces: NamespaceDefinition[]; };
}

export type DecoratedDefinitions = ClassMethodParameterDefinition | ClassConstructorParameterDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;

export type TypeParameteredDefinitions = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition;

export type ModuledDefinitions = NamespaceDefinition | FileDefinition;

export type WriteableDefinitions = EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition | FileDefinition;

export type ExportableDefinitions = EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition;

export type NodeDefinitions = EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ReExportDefinition | ClassDefinition | InterfaceDefinition | ImportDefinition | NamespaceDefinition;

export type ModuleMemberDefinitions = EnumDefinition | FunctionDefinition | VariableDefinition | TypeAliasDefinition | ClassDefinition | InterfaceDefinition | NamespaceDefinition;

export type BaseFunctionDefinitions = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition;

export type FunctionBodyWriteableDefinitions = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition | InterfaceMethodDefinition;

export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;

export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;

export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition | ClassConstructorParameterDefinition | CallSignatureParameterDefinition | TypeFunctionParameterDefinition;

export type ParameteredDefinitions = CallSignatureDefinition | FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition | InterfaceMethodDefinition | TypeNodeDefinition;

export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;

export type MethodDefinitions = ClassMethodDefinition | InterfaceMethodDefinition;

export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;

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
    onBeforeWrite?: undefined | ((writer: CodeBlockWriter) => void);
    onAfterWrite?: undefined | ((writer: CodeBlockWriter) => void);
}

export interface NamedStructure {
    name: string;
}

export interface OptionallyNamedStructure {
    name?: undefined | string;
}

export interface AbstractableStructure {
    isAbstract?: undefined | true | false;
}

export interface AmbientableStructure {
    isAmbient?: undefined | true | false;
    hasDeclareKeyword?: undefined | true | false;
}

export interface AsyncableStructure {
    isAsync?: undefined | true | false;
}

export interface DefaultExpressionedStructure {
    defaultExpression?: undefined | string;
}

export interface DecoratableStructure {
    decorators?: undefined | DecoratorStructure[];
}

export interface ExportableStructure {
    isExported?: undefined | true | false;
    isNamedExportOfFile?: undefined | true | false;
    isDefaultExportOfFile?: undefined | true | false;
}

export interface FunctionBodyWriteableStructure {
    onWriteFunctionBody?: undefined | ((writer: CodeBlockWriter) => void);
}

export interface DocumentationedStructure {
    documentationComment?: undefined | string;
}

export interface ModuledStructure {
    namespaces?: undefined | NamespaceStructure[];
    classes?: undefined | ClassStructure[];
    interfaces?: undefined | InterfaceStructure[];
    functions?: undefined | FunctionStructure[];
    enums?: undefined | EnumStructure[];
    variables?: undefined | VariableStructure[];
    typeAliases?: undefined | TypeAliasStructure[];
}

export interface OptionalStructure {
    isOptional?: undefined | true | false;
}

export interface BaseObjectPropertyStructure extends BasePropertyStructure, DefaultExpressionedStructure {
}

export interface TypedStructure {
    type?: undefined | string;
}

export interface BasePropertyStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure, ReadonlyableStructure {
}

export interface TypeParameteredStructure {
    typeParameters?: undefined | TypeParameterStructure[];
}

export interface BaseFunctionStructure<T extends BaseParameterStructure> extends BaseStructure, NamedStructure, TypeParameteredStructure, ParameteredStructure<T>, ReturnTypedStructure, OverloadSignaturedStructure, DocumentationedStructure {
    isGenerator?: undefined | true | false;
}

export interface BaseParameterStructure extends BaseStructure, OptionallyNamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure {
    isRestParameter?: undefined | true | false;
    destructuringProperties?: undefined | ObjectPropertyStructure[];
}

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: undefined | T[];
}

export interface ReadonlyableStructure {
    isReadonly?: undefined | true | false;
}

export interface ReturnTypedStructure {
    returnType?: undefined | string;
}

export interface OverloadSignaturedStructure {
    overloadSignatures?: undefined | CallSignatureStructure[];
}

export interface CallSignatureStructure extends BaseStructure, TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure, DocumentationedStructure {
}

export interface CallSignatureParameterStructure extends BaseParameterStructure {
}

export interface DecoratorStructure extends BaseStructure, NamedStructure {
    arguments?: undefined | string[];
    isDecoratorFactory?: undefined | true | false;
}

export interface IndexSignatureStructure extends BaseStructure, ReturnTypedStructure, ReadonlyableStructure {
    keyName: string;
    keyType?: undefined | string;
    returnType: string;
}

export interface ObjectPropertyStructure extends BaseObjectPropertyStructure {
}

export interface TypeAliasStructure extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure {
    type: string;
}

export interface TypeParameterStructure extends BaseStructure, NamedStructure {
    constraintType?: undefined | string;
}

export interface TypePropertyStructure extends BasePropertyStructure {
}

export interface UserDefinedTypeGuardStructure extends BaseStructure {
    parameterName?: undefined | string;
    type: string;
}

export interface BaseClassMethodStructure<ParameterType extends BaseClassMethodParameterStructure> extends BaseFunctionStructure<ParameterType>, AsyncableStructure, DecoratableStructure, ScopedStructure, FunctionBodyWriteableStructure {
}

export interface BaseClassMethodParameterStructure extends BaseParameterStructure, DecoratableStructure {
}

export interface BaseClassPropertyStructure extends BaseObjectPropertyStructure, DecoratableStructure, ScopedStructure, DocumentationedStructure {
}

export interface ScopedStructure {
    scope?: undefined | "public" | "private" | "protected";
}

export interface ClassMethodParameterStructure extends BaseClassMethodParameterStructure {
}

export interface ClassMethodStructure extends BaseClassMethodStructure<ClassMethodParameterStructure>, AbstractableStructure {
}

export interface ClassPropertyStructure extends BaseClassPropertyStructure, AbstractableStructure {
    kind?: undefined | ClassPropertyKind;
    onWriteGetBody?: undefined | ((writer: CodeBlockWriter) => void);
    onWriteSetBody?: undefined | ((writer: CodeBlockWriter) => void);
}

export interface ClassConstructorStructure extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure>, FunctionBodyWriteableStructure, ScopedStructure, DocumentationedStructure, OverloadSignaturedStructure {
}

export interface ClassConstructorParameterStructure extends BaseParameterStructure, ReadonlyableStructure {
    scope?: undefined | "none" | "public" | "private" | "protected";
}

export interface ClassStaticMethodParameterStructure extends BaseClassMethodParameterStructure {
}

export interface ClassStaticMethodStructure extends BaseClassMethodStructure<ClassStaticMethodParameterStructure> {
}

export interface ClassStaticPropertyStructure extends BaseClassPropertyStructure {
}

export interface ClassStructure extends BaseStructure, NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure, DocumentationedStructure {
    methods?: undefined | ClassMethodStructure[];
    properties?: undefined | ClassPropertyStructure[];
    staticMethods?: undefined | ClassStaticMethodStructure[];
    staticProperties?: undefined | ClassStaticPropertyStructure[];
    constructorDef?: undefined | ClassConstructorStructure;
    extendsTypes?: undefined | string[];
    implementsTypes?: undefined | string[];
}

export interface EnumStructure extends BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure, DocumentationedStructure {
    isConst?: undefined | true | false;
    members?: undefined | EnumMemberStructure[];
}

export interface EnumMemberStructure extends BaseStructure, NamedStructure, DocumentationedStructure {
    value: number;
}

export interface TypeFunctionParameterStructure extends BaseParameterStructure {
}

export interface FileStructure extends BaseStructure, ModuledStructure {
    imports?: undefined | ImportStructure[];
    reExports?: undefined | ReExportStructure[];
    fileName?: undefined | string;
    defaultExportExpression?: undefined | string;
}

export interface NamedImportPartStructure {
    name: string;
    alias?: undefined | string;
}

export interface ImportStructure extends BaseStructure {
    moduleSpecifier: string;
    starImportName?: undefined | string;
    defaultImportName?: undefined | string;
    namedImports?: undefined | NamedImportPartStructure[];
}

export interface ReExportStructure extends BaseStructure {
    moduleSpecifier: string;
    namedExports?: undefined | NamedImportPartStructure[];
}

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, AmbientableStructure, AsyncableStructure, ExportableStructure, FunctionBodyWriteableStructure {
}

export interface FunctionParameterStructure extends BaseParameterStructure {
}

export interface InterfaceMethodStructure extends BaseFunctionStructure<InterfaceMethodParameterStructure> {
}

export interface InterfaceMethodParameterStructure extends BaseParameterStructure {
}

export interface InterfacePropertyStructure extends BasePropertyStructure, DocumentationedStructure {
}

export interface InterfaceStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure {
    callSignatures?: undefined | CallSignatureStructure[];
    extendsTypes?: undefined | string[];
    methods?: undefined | InterfaceMethodStructure[];
    newSignatures?: undefined | CallSignatureStructure[];
    indexSignatures?: undefined | IndexSignatureStructure[];
    properties?: undefined | InterfacePropertyStructure[];
}

export interface NamespaceStructure extends BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure, DocumentationedStructure {
    declarationType?: undefined | "module" | "namespace";
}

export interface VariableStructure extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure, DocumentationedStructure {
    declarationType?: undefined | "const" | "var" | "let";
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

export function createType(text: string): TypeDefinition;

export function createTypeAlias(structure: TypeAliasStructure): TypeAliasDefinition;

export function createTypeParameter(structure: TypeParameterStructure): TypeParameterDefinition;

export function createNamedImportPart(structure: NamedImportPartStructure): NamedImportPartDefinition;

export function createVariable(structure: VariableStructure): VariableDefinition;
