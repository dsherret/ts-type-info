export * from "./definitions/base";
export * from "./definitions/general";
export * from "./definitions/expression";
export * from "./definitions/function";
export * from "./definitions/class";
export * from "./definitions/interface";
export * from "./definitions/enum";
export * from "./definitions/namespace";
export * from "./definitions/file";
export * from "./definitions/variable";

import {FileDefinition, ImportDefinition, ReExportDefinition} from "./definitions/file";
import {FunctionDefinition, FunctionParameterDefinition} from "./definitions/function";
import {InterfaceDefinition, InterfaceMethodParameterDefinition, InterfaceMethodDefinition, InterfacePropertyDefinition} from "./definitions/interface";
import {ClassDefinition, ClassMethodParameterDefinition, ClassStaticMethodParameterDefinition, ClassMethodDefinition, ClassPropertyDefinition,
    ClassStaticMethodDefinition, ClassStaticPropertyDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./definitions/class";
import {EnumDefinition} from "./definitions/enum";
import {NamespaceDefinition} from "./definitions/namespace";
import {VariableDefinition} from "./definitions/variable";
import {TypeAliasDefinition, CallSignatureDefinition, CallSignatureParameterDefinition} from "./definitions/general";

// "ed" definitions
export type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition |
    ClassMethodParameterDefinition | ClassConstructorParameterDefinition;
export type TypeParameteredDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition |
    ClassStaticMethodDefinition | TypeAliasDefinition;
export type ModuledDefinitions = FileDefinition | NamespaceDefinition;
// "able" definitions
export type WriteableDefinitions = FileDefinition | NamespaceDefinition | ClassDefinition| InterfaceDefinition | FunctionDefinition | EnumDefinition |
    VariableDefinition | TypeAliasDefinition;
export type ExportableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
// other
export type NodeDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition |
    ImportDefinition | ReExportDefinition;
export type ModuleMemberDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
export type BaseFunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;
export type FunctionBodyWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;
export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;
export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;
export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition |
    ClassConstructorParameterDefinition | CallSignatureParameterDefinition;
export type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition |
    CallSignatureDefinition;
export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;
export type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;
export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;
