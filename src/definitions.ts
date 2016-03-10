export * from "./definitions/base";
export * from "./definitions/General";
export * from "./definitions/Function";
export * from "./definitions/class";
export * from "./definitions/Interface";
export * from "./definitions/Enum";
export * from "./definitions/Namespace";
export * from "./definitions/File";
export * from "./definitions/Variable";

import {FileDefinition, ImportDefinition, ReExportDefinition} from "./definitions/File";
import {FunctionDefinition, FunctionParameterDefinition, CallSignatureDefinition, CallSignatureParameterDefinition} from "./definitions/Function";
import {InterfaceDefinition, InterfaceMethodParameterDefinition, InterfaceMethodDefinition,
        InterfaceNewSignatureParameterDefinition, InterfacePropertyDefinition, InterfaceNewSignatureDefinition} from "./definitions/Interface";
import {ClassDefinition, ClassMethodParameterDefinition, ClassStaticMethodParameterDefinition, ClassMethodDefinition, ClassPropertyDefinition,
        ClassStaticMethodDefinition, ClassStaticPropertyDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./definitions/class";
import {EnumDefinition, EnumMemberDefinition} from "./definitions/Enum";
import {NamespaceDefinition} from "./definitions/Namespace";
import {VariableDefinition} from "./definitions/Variable";
import {TypeParameterDefinition, TypePropertyDefinition, DecoratorDefinition, TypeAliasDefinition} from "./definitions/General";

// group types
export type ClassDefinitions = ClassDefinition | ClassMethodDefinition | ClassMethodParameterDefinition | ClassPropertyDefinition | ClassConstructorDefinition |
    ClassConstructorParameterDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassStaticMethodParameterDefinition;
export type InterfaceDefinitions = InterfaceDefinition | InterfaceMethodParameterDefinition | InterfaceMethodParameterDefinition | InterfacePropertyDefinition |
    InterfaceNewSignatureDefinition | InterfaceNewSignatureParameterDefinition;
export type EnumDefinitions = EnumDefinition | EnumMemberDefinition;
export type FunctionDefinitions = CallSignatureDefinition | CallSignatureParameterDefinition | FunctionDefinition | FunctionParameterDefinition;
export type NamespaceDefinitions = NamespaceDefinition;
export type GeneralDefinitions = TypeParameterDefinition<TypeParameteredDefinitions> | TypePropertyDefinition | DecoratorDefinition<DecoratedDefinitions> | TypeAliasDefinition;
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
