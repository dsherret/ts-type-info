import * as structures from "./structures";
import {StructureFactory} from "./factories";

export function createCallSignature(structure: structures.CallSignatureStructure = {}) {
    return new StructureFactory().getCallSignature(structure);
}

export function createCallSignatureParameter(structure: structures.CallSignatureParameterStructure) {
    return new StructureFactory().getCallSignatureParameter(structure);
}

export function createClass(structure: structures.ClassStructure) {
    return new StructureFactory().getClass(structure);
}

export function createClassConstructor(structure: structures.ClassConstructorStructure = {}) {
    return new StructureFactory().getClassConstructor(structure);
}

export function createClassConstructorParameter(structure: structures.ClassConstructorParameterStructure) {
    return new StructureFactory().getClassConstructorParameter(structure);
}

export function createClassMethod(structure: structures.ClassMethodStructure) {
    return new StructureFactory().getClassMethod(structure);
}

export function createClassMethodParameter(structure: structures.ClassMethodParameterStructure) {
    return new StructureFactory().getClassMethodParameter(structure);
}

export function createClassProperty(structure: structures.ClassPropertyStructure) {
    return new StructureFactory().getClassProperty(structure);
}

export function createClassStaticMethod(structure: structures.ClassStaticMethodStructure) {
    return new StructureFactory().getClassStaticMethod(structure);
}

export function createClassStaticMethodParameter(structure: structures.ClassStaticMethodParameterStructure) {
    return new StructureFactory().getClassStaticMethodParameter(structure);
}

export function createClassStaticProperty(structure: structures.ClassStaticPropertyStructure) {
    return new StructureFactory().getClassStaticProperty(structure);
}

export function createDecorator(structure: structures.DecoratorStructure) {
    return new StructureFactory().getDecorator(structure);
}

export function createEnum(structure: structures.EnumStructure) {
    return new StructureFactory().getEnum(structure);
}

export function createEnumMember(structure: structures.EnumMemberStructure) {
    return new StructureFactory().getEnumMember(structure);
}

export function createFile(structure: structures.FileStructure = {}) {
    return new StructureFactory().getFile(structure);
}

export function createFunction(structure: structures.FunctionStructure) {
    return new StructureFactory().getFunction(structure);
}

export function createFunctionParameter(structure: structures.FunctionParameterStructure) {
    return new StructureFactory().getFunctionParameter(structure);
}

export function createImport(structure: structures.ImportStructure) {
    return new StructureFactory().getImport(structure);
}

export function createIndexSignature(structure: structures.IndexSignatureStructure) {
    return new StructureFactory().getIndexSignature(structure);
}

export function createInterface(structure: structures.InterfaceStructure) {
    return new StructureFactory().getInterface(structure);
}

export function createInterfaceMethod(structure: structures.InterfaceMethodStructure) {
    return new StructureFactory().getInterfaceMethod(structure);
}

export function createInterfaceMethodParameter(structure: structures.InterfaceMethodParameterStructure) {
    return new StructureFactory().getInterfaceMethodParameter(structure);
}

export function createInterfaceProperty(structure: structures.InterfacePropertyStructure) {
    return new StructureFactory().getInterfaceProperty(structure);
}

export function createNamespace(structure: structures.NamespaceStructure) {
    return new StructureFactory().getNamespace(structure);
}

export function createReExport(structure: structures.ReExportStructure) {
    return new StructureFactory().getReExport(structure);
}

export function createType(text: string) {
    return new StructureFactory().getTypeFromText(text);
}

export function createTypeAlias(structure: structures.TypeAliasStructure) {
    return new StructureFactory().getTypeAlias(structure);
}

export function createTypeParameter(structure: structures.TypeParameterStructure) {
    return new StructureFactory().getTypeParameter(structure);
}

export function createNamedImportPart(structure: structures.NamedImportPartStructure) {
    return new StructureFactory().getNamedImportPart(structure);
}

export function createVariable(structure: structures.VariableStructure) {
    return new StructureFactory().getVariable(structure);
}
