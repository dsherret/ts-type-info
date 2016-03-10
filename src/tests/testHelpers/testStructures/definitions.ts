export * from "./definitions/base";
export * from "./definitions/General";
export * from "./definitions/class";
export * from "./definitions/Enum";
export * from "./definitions/File";
export * from "./definitions/Function";
export * from "./definitions/Interface";
export * from "./definitions/Namespace";
export * from "./definitions/Variable";

import {FileTestStructure} from "./definitions/File";
import {FunctionTestStructure, FunctionParameterTestStructure, CallSignatureTestStructure, CallSignatureParameterTestStructure} from "./definitions/Function";
import {InterfaceTestStructure, InterfaceMethodParameterTestStructure, InterfaceMethodTestStructure,
        InterfaceNewSignatureParameterTestStructure, InterfacePropertyTestStructure, InterfaceNewSignatureTestStructure} from "./definitions/Interface";
import {ClassTestStructure, ClassMethodParameterTestStructure, ClassStaticMethodParameterTestStructure, ClassMethodTestStructure, ClassPropertyTestStructure,
        ClassStaticMethodTestStructure, ClassStaticPropertyTestStructure, ClassConstructorTestStructure, ClassConstructorParameterTestStructure} from "./definitions/class";
import {EnumTestStructure} from "./definitions/Enum";
import {NamespaceTestStructure} from "./definitions/Namespace";
import {VariableTestStructure} from "./definitions/Variable";

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
