export * from "./definitions/base";
export * from "./definitions/general";
export * from "./definitions/class";
export * from "./definitions/enum";
export * from "./definitions/file";
export * from "./definitions/function";
export * from "./definitions/interface";
export * from "./definitions/namespace";
export * from "./definitions/variable";

import {FileStructure} from "./definitions/file";
import {FunctionStructure, FunctionParameterStructure, CallSignatureStructure, CallSignatureParameterStructure} from "./definitions/function";
import {InterfaceStructure, InterfaceMethodParameterStructure, InterfaceMethodStructure,
        InterfaceNewSignatureParameterStructure, InterfacePropertyStructure, InterfaceNewSignatureStructure} from "./definitions/interface";
import {ClassStructure, ClassMethodParameterStructure, ClassMethodStructure, ClassPropertyStructure,
        ClassStaticMethodStructure, ClassStaticPropertyStructure, ConstructorStructure, ConstructorParameterStructure} from "./definitions/class";
import {EnumStructure} from "./definitions/enum";
import {NamespaceStructure} from "./definitions/namespace";
import {VariableStructure} from "./definitions/variable";

export type WriteableStructures = FileStructure | NamespaceStructure | ClassStructure| InterfaceStructure | FunctionStructure | EnumStructure | VariableStructure;
export type FunctionStructures = FunctionStructure | InterfaceMethodStructure | ClassMethodStructure;
export type ParameterStructures = FunctionParameterStructure | InterfaceMethodParameterStructure | ClassMethodParameterStructure | InterfaceNewSignatureParameterStructure | ConstructorParameterStructure | CallSignatureParameterStructure;
export type ParameteredStructures = FunctionStructure | InterfaceMethodStructure | ClassMethodStructure | InterfaceNewSignatureStructure | ConstructorStructure | CallSignatureStructure;
export type PropertyStructures = InterfacePropertyStructure | ClassPropertyStructure | ClassStaticPropertyStructure;
export type MethodStructures = InterfaceMethodStructure | ClassMethodStructure;
export type MethodParameterStructures = InterfaceMethodParameterStructure | ClassMethodParameterStructure;
export type MainStructures = ClassStructure | FunctionStructure | InterfaceStructure | EnumStructure | NamespaceStructure | VariableStructure;
export type ExportedStructures = ClassStructure | FunctionStructure | InterfaceStructure | EnumStructure | NamespaceStructure | VariableStructure;
export type DecoratedStructures = ClassStructure | ClassMethodStructure | ClassPropertyStructure | ClassStaticMethodStructure | ClassStaticPropertyStructure | ClassMethodParameterStructure;
