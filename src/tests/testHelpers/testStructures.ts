export * from "./testStructures/expressions";
export * from "./testStructures/base";
export * from "./testStructures/general";
export * from "./testStructures/class";
export * from "./testStructures/enum";
export * from "./testStructures/file";
export * from "./testStructures/function";
export * from "./testStructures/interface";
export * from "./testStructures/namespace";
export * from "./testStructures/variable";

import {FileTestStructure} from "./testStructures/file";
import {FunctionTestStructure, FunctionParameterTestStructure, CallSignatureTestStructure, CallSignatureParameterTestStructure} from "./testStructures/function";
import {InterfaceTestStructure, InterfaceMethodParameterTestStructure, InterfaceMethodTestStructure,
        InterfaceNewSignatureParameterTestStructure, InterfacePropertyTestStructure, InterfaceNewSignatureTestStructure} from "./testStructures/interface";
import {ClassTestStructure, ClassMethodParameterTestStructure, ClassStaticMethodParameterTestStructure, ClassMethodTestStructure, ClassPropertyTestStructure,
        ClassStaticMethodTestStructure, ClassStaticPropertyTestStructure, ClassConstructorTestStructure, ClassConstructorParameterTestStructure} from "./testStructures/class";
import {EnumTestStructure} from "./testStructures/enum";
import {NamespaceTestStructure} from "./testStructures/namespace";
import {VariableTestStructure} from "./testStructures/variable";

export type WriteableTestStructures = FileTestStructure | NamespaceTestStructure | ClassTestStructure| InterfaceTestStructure | FunctionTestStructure |
    EnumTestStructure | VariableTestStructure;
export type FunctionTestStructures = FunctionTestStructure | InterfaceMethodTestStructure | ClassMethodTestStructure;
export type ClassMethodTestStructures = ClassMethodTestStructure | ClassStaticMethodTestStructure;
export type ClassMethodParameterTestStructures = ClassMethodParameterTestStructure | ClassStaticMethodParameterTestStructure;
export type ParameterTestStructures = FunctionParameterTestStructure | InterfaceMethodParameterTestStructure | ClassMethodParameterTestStructure |
    ClassStaticMethodParameterTestStructure | InterfaceNewSignatureParameterTestStructure | ClassConstructorParameterTestStructure | CallSignatureParameterTestStructure;
export type ParameteredTestStructures = FunctionTestStructure | InterfaceMethodTestStructure | ClassMethodTestStructure | InterfaceNewSignatureTestStructure |
    ClassConstructorTestStructure | CallSignatureTestStructure;
export type PropertyTestStructures = InterfacePropertyTestStructure | ClassPropertyTestStructure | ClassStaticPropertyTestStructure;
export type MethodTestStructures = InterfaceMethodTestStructure | ClassMethodTestStructure;
export type MethodParameterTestStructures = InterfaceMethodParameterTestStructure | ClassMethodParameterTestStructure;
export type MainTestStructures = ClassTestStructure | FunctionTestStructure | InterfaceTestStructure | EnumTestStructure | NamespaceTestStructure | VariableTestStructure;
export type ExportedTestStructures = ClassTestStructure | FunctionTestStructure | InterfaceTestStructure | EnumTestStructure | NamespaceTestStructure | VariableTestStructure;
export type DecoratedTestStructures = ClassTestStructure | ClassMethodTestStructure | ClassPropertyTestStructure | ClassStaticMethodTestStructure | ClassStaticPropertyTestStructure |
    ClassMethodParameterTestStructure;
