export * from "./definitions/base";
export * from "./definitions/general";
export * from "./definitions/function";
export * from "./definitions/class";
export * from "./definitions/interface";
export * from "./definitions/enum";
export * from "./definitions/namespace";
export * from "./definitions/file";
export * from "./definitions/variable";

import {FileDefinition} from "./definitions/file";
import {FunctionDefinition, FunctionParameterDefinition, CallSignatureDefinition, CallSignatureParameterDefinition} from "./definitions/function";
import {InterfaceDefinition, InterfaceMethodParameterDefinition, InterfaceMethodDefinition,
        InterfaceNewSignatureParameterDefinition, InterfacePropertyDefinition, InterfaceNewSignatureDefinition} from "./definitions/interface";
import {ClassDefinition, ClassMethodParameterDefinition, ClassStaticMethodParameterDefinition, ClassMethodDefinition, ClassPropertyDefinition,
        ClassStaticMethodDefinition, ClassStaticPropertyDefinition, ConstructorDefinition, ConstructorParameterDefinition} from "./definitions/class";
import {EnumDefinition} from "./definitions/enum";
import {NamespaceDefinition} from "./definitions/namespace";
import {VariableDefinition} from "./definitions/variable";

export type WriteableDefinitions = FileDefinition | NamespaceDefinition | ClassDefinition| InterfaceDefinition | FunctionDefinition | EnumDefinition | VariableDefinition;
export type FunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition;
export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;
export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;
export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition |
                                   InterfaceNewSignatureParameterDefinition | ConstructorParameterDefinition | CallSignatureParameterDefinition;
export type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | InterfaceNewSignatureDefinition | ConstructorDefinition |
                                     CallSignatureDefinition;
export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;
export type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;
export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;
export type MainDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition;
export type ExportedDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition;
export type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition |
                                    ClassMethodParameterDefinition;
