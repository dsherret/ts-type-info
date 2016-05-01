import {CallSignatureStructure, CallSignatureParameterStructure, ClassStructure, ClassConstructorStructure, ClassConstructorParameterStructure, ClassMethodStructure,
    ClassMethodParameterStructure, ClassPropertyStructure, ClassStaticMethodStructure, ClassStaticMethodParameterStructure, ClassStaticPropertyStructure,
    DecoratorStructure, EnumStructure, EnumMemberStructure, FileStructure, FunctionStructure, FunctionParameterStructure, ImportStructure, IndexSignatureStructure, InterfaceStructure,
    InterfaceMethodStructure, InterfaceMethodParameterStructure, InterfacePropertyStructure, NamespaceStructure, ReExportStructure, TypeAliasStructure,
    VariableStructure} from "./structures";
import {StructureFactory} from "./factories";

export function createCallSignature(structure: CallSignatureStructure = {}) {
    return new StructureFactory().getCallSignature(structure);
}

export function createCallSignatureParameter(structure: CallSignatureParameterStructure) {
    return new StructureFactory().getCallSignatureParameter(structure);
}

export function createClass(structure: ClassStructure) {
    return new StructureFactory().getClass(structure);
}

export function createClassConstructor(structure: ClassConstructorStructure = {}) {
    return new StructureFactory().getClassConstructor(structure);
}

export function createClassConstructorParameter(structure: ClassConstructorParameterStructure) {
    return new StructureFactory().getClassConstructorParameter(structure);
}

export function createClassMethod(structure: ClassMethodStructure) {
    return new StructureFactory().getClassMethod(structure);
}

export function createClassMethodParameter(structure: ClassMethodParameterStructure) {
    return new StructureFactory().getClassMethodParameter(structure);
}

export function createClassProperty(structure: ClassPropertyStructure) {
    return new StructureFactory().getClassProperty(structure);
}

export function createClassStaticMethod(structure: ClassStaticMethodStructure) {
    return new StructureFactory().getClassStaticMethod(structure);
}

export function createClassStaticMethodParameter(structure: ClassStaticMethodParameterStructure) {
    return new StructureFactory().getClassStaticMethodParameter(structure);
}

export function createClassStaticProperty(structure: ClassStaticPropertyStructure) {
    return new StructureFactory().getClassStaticProperty(structure);
}

export function createDecorator(structure: DecoratorStructure) {
    return new StructureFactory().getDecorator(structure);
}

export function createEnum(structure: EnumStructure) {
    return new StructureFactory().getEnum(structure);
}

export function createEnumMember(structure: EnumMemberStructure) {
    return new StructureFactory().getEnumMember(structure);
}

export function createFile(structure: FileStructure = {}) {
    return new StructureFactory().getFile(structure);
}

export function createFunction(structure: FunctionStructure) {
    return new StructureFactory().getFunction(structure);
}

export function createFunctionParameter(structure: FunctionParameterStructure) {
    return new StructureFactory().getFunctionParameter(structure);
}

export function createImport(structure: ImportStructure) {
    return new StructureFactory().getImport(structure);
}

export function createIndexSignature(structure: IndexSignatureStructure) {
    return new StructureFactory().getIndexSignature(structure);
}

export function createInterface(structure: InterfaceStructure) {
    return new StructureFactory().getInterface(structure);
}

export function createInterfaceMethod(structure: InterfaceMethodStructure) {
    return new StructureFactory().getInterfaceMethod(structure);
}

export function createInterfaceMethodParameter(structure: InterfaceMethodParameterStructure) {
    return new StructureFactory().getInterfaceMethodParameter(structure);
}

export function createInterfaceProperty(structure: InterfacePropertyStructure) {
    return new StructureFactory().getInterfaceProperty(structure);
}

export function createNamespace(structure: NamespaceStructure) {
    return new StructureFactory().getNamespace(structure);
}

export function createReExport(structure: ReExportStructure) {
    return new StructureFactory().getReExport(structure);
}

export function createTypeAlias(structure: TypeAliasStructure) {
    return new StructureFactory().getTypeAlias(structure);
}

export function createVariable(structure: VariableStructure) {
    return new StructureFactory().getVariable(structure);
}
