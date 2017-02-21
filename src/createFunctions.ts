import * as structures from "./structures";
import {MainFactory} from "./factories";

export function createCallSignature(structure: structures.CallSignatureStructure = {}) {
    return new MainFactory().createStructureFactory().getCallSignature(structure);
}

export function createCallSignatureParameter(structure: structures.CallSignatureParameterStructure) {
    return new MainFactory().createStructureFactory().getCallSignatureParameter(structure);
}

export function createClass(structure: structures.ClassStructure) {
    return new MainFactory().createStructureFactory().getClass(structure);
}

export function createClassConstructor(structure: structures.ClassConstructorStructure = {}) {
    return new MainFactory().createStructureFactory().getClassConstructor(structure);
}

export function createClassConstructorParameter(structure: structures.ClassConstructorParameterStructure) {
    return new MainFactory().createStructureFactory().getClassConstructorParameter(structure);
}

export function createClassMethod(structure: structures.ClassMethodStructure) {
    return new MainFactory().createStructureFactory().getClassMethod(structure);
}

export function createClassMethodParameter(structure: structures.ClassMethodParameterStructure) {
    return new MainFactory().createStructureFactory().getClassMethodParameter(structure);
}

export function createClassProperty(structure: structures.ClassPropertyStructure) {
    return new MainFactory().createStructureFactory().getClassProperty(structure);
}

export function createClassStaticMethod(structure: structures.ClassStaticMethodStructure) {
    return new MainFactory().createStructureFactory().getClassStaticMethod(structure);
}

export function createClassStaticMethodParameter(structure: structures.ClassStaticMethodParameterStructure) {
    return new MainFactory().createStructureFactory().getClassStaticMethodParameter(structure);
}

export function createClassStaticProperty(structure: structures.ClassStaticPropertyStructure) {
    return new MainFactory().createStructureFactory().getClassStaticProperty(structure);
}

export function createDecorator(structure: structures.DecoratorStructure) {
    return new MainFactory().createStructureFactory().getDecorator(structure);
}

export function createEnum(structure: structures.EnumStructure) {
    return new MainFactory().createStructureFactory().getEnum(structure);
}

export function createEnumMember(structure: structures.EnumMemberStructure) {
    return new MainFactory().createStructureFactory().getEnumMember(structure);
}

export function createFile(structure: structures.FileStructure = {}) {
    return new MainFactory().createStructureFactory().getFile(structure);
}

export function createFunction(structure: structures.FunctionStructure) {
    return new MainFactory().createStructureFactory().getFunction(structure);
}

export function createFunctionParameter(structure: structures.FunctionParameterStructure) {
    return new MainFactory().createStructureFactory().getFunctionParameter(structure);
}

export function createImport(structure: structures.ImportStructure) {
    return new MainFactory().createStructureFactory().getImport(structure);
}

export function createIndexSignature(structure: structures.IndexSignatureStructure) {
    return new MainFactory().createStructureFactory().getIndexSignature(structure);
}

export function createInterface(structure: structures.InterfaceStructure) {
    return new MainFactory().createStructureFactory().getInterface(structure);
}

export function createInterfaceMethod(structure: structures.InterfaceMethodStructure) {
    return new MainFactory().createStructureFactory().getInterfaceMethod(structure);
}

export function createInterfaceMethodParameter(structure: structures.InterfaceMethodParameterStructure) {
    return new MainFactory().createStructureFactory().getInterfaceMethodParameter(structure);
}

export function createInterfaceProperty(structure: structures.InterfacePropertyStructure) {
    return new MainFactory().createStructureFactory().getInterfaceProperty(structure);
}

export function createNamespace(structure: structures.NamespaceStructure) {
    return new MainFactory().createStructureFactory().getNamespace(structure);
}

export function createReExport(structure: structures.ReExportStructure) {
    return new MainFactory().createStructureFactory().getReExport(structure);
}

export function createType(text: string) {
    return new MainFactory().createStructureFactory().getTypeFromText(text);
}

export function createTypeAlias(structure: structures.TypeAliasStructure) {
    return new MainFactory().createStructureFactory().getTypeAlias(structure);
}

export function createTypeParameter(structure: structures.TypeParameterStructure) {
    return new MainFactory().createStructureFactory().getTypeParameter(structure);
}

export function createNamedImportPart(structure: structures.NamedImportPartStructure) {
    return new MainFactory().createStructureFactory().getNamedImportPart(structure);
}

export function createVariable(structure: structures.VariableStructure) {
    return new MainFactory().createStructureFactory().getVariable(structure);
}
