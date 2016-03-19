export * from "./definitions/base";
export * from "./definitions/general";
export * from "./definitions/expressions";
export * from "./definitions/function";
export * from "./definitions/class";
export * from "./definitions/interface";
export * from "./definitions/enum";
export * from "./definitions/namespace";
export * from "./definitions/file";
export * from "./definitions/variable";

import {FileDefinition, ImportDefinition, ReExportDefinition} from "./definitions/file";
import {FunctionDefinition, FunctionParameterDefinition, CallSignatureDefinition, CallSignatureParameterDefinition} from "./definitions/function";
import {InterfaceDefinition, InterfaceMethodParameterDefinition, InterfaceMethodDefinition,
        InterfaceNewSignatureParameterDefinition, InterfacePropertyDefinition, InterfaceNewSignatureDefinition} from "./definitions/interface";
import {ClassDefinition, ClassMethodParameterDefinition, ClassStaticMethodParameterDefinition, ClassMethodDefinition, ClassPropertyDefinition,
        ClassStaticMethodDefinition, ClassStaticPropertyDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./definitions/class";
import {EnumDefinition, EnumMemberDefinition} from "./definitions/enum";
import {NamespaceDefinition} from "./definitions/namespace";
import {VariableDefinition} from "./definitions/variable";
import {TypeParameterDefinition, TypePropertyDefinition, DecoratorDefinition, TypeAliasDefinition} from "./definitions/general";

// group types
export type ClassDefinitions = ClassDefinition | ClassMethodDefinition | ClassMethodParameterDefinition | ClassPropertyDefinition | ClassConstructorDefinition |
    ClassConstructorParameterDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassStaticMethodParameterDefinition;
export type InterfaceDefinitions = InterfaceDefinition | InterfaceMethodParameterDefinition | InterfaceMethodParameterDefinition | InterfacePropertyDefinition |
    InterfaceNewSignatureDefinition | InterfaceNewSignatureParameterDefinition;
export type EnumDefinitions = EnumDefinition | EnumMemberDefinition;
export type FunctionDefinitions = CallSignatureDefinition | CallSignatureParameterDefinition | FunctionDefinition | FunctionParameterDefinition;
export type NamespaceDefinitions = NamespaceDefinition;
export type GeneralDefinitions = TypeParameterDefinition | TypePropertyDefinition | DecoratorDefinition | TypeAliasDefinition;
export type VariableDefinitions = VariableDefinition;

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
export type FunctionWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;
export type FunctionBodyWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;
export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;
export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;
export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition |
                                   InterfaceNewSignatureParameterDefinition | ClassConstructorParameterDefinition | CallSignatureParameterDefinition;
export type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceNewSignatureDefinition |
                                    ClassConstructorDefinition | CallSignatureDefinition;
export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;
export type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;
export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;
