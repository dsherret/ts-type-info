export * from "./definitions/base";
export * from "./definitions/general";
export * from "./definitions/class";
export * from "./definitions/enum";
export * from "./definitions/file";
export * from "./definitions/function";
export * from "./definitions/interface";
export * from "./definitions/namespace";
export * from "./definitions/variable";

import {FileTestStructure} from "./definitions/file";
import {FunctionTestStructure, FunctionParameterTestStructure, CallSignatureTestStructure, CallSignatureParameterTestStructure} from "./definitions/function";
import {InterfaceTestStructure, InterfaceMethodParameterTestStructure, InterfaceMethodTestStructure,
        InterfaceNewSignatureParameterTestStructure, InterfacePropertyTestStructure, InterfaceNewSignatureTestStructure} from "./definitions/interface";
import {ClassTestStructure, ClassMethodParameterTestStructure, ClassStaticMethodParameterTestStructure, ClassMethodTestStructure, ClassPropertyTestStructure,
        ClassStaticMethodTestStructure, ClassStaticPropertyTestStructure, ClassConstructorTestStructure, ClassConstructorParameterTestStructure} from "./definitions/class";
import {EnumTestStructure} from "./definitions/enum";
import {NamespaceTestStructure} from "./definitions/namespace";
import {VariableTestStructure} from "./definitions/variable";

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
