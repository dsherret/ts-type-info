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
import {EnumDefinition, EnumMemberDefinition} from "./definitions/enum";
import {NamespaceDefinition} from "./definitions/namespace";
import {VariableDefinition} from "./definitions/variable";
import {TypeParameterDefinition, TypePropertyDefinition, DecoratorDefinition, TypeAliasDefinition} from "./definitions/general";

// all types
export type AllDefinitions = FileDefinition | ClassDefinitions | InterfaceDefinitions | EnumDefinitions | FunctionDefinitions | GeneralDefinitions |
    NamespaceDefinitions | VariableDefinitions;

// group types (based on the folder they're in)
export type ClassDefinitions = ClassDefinition | ClassMethodDefinition | ClassMethodParameterDefinition | ClassPropertyDefinition | ConstructorDefinition |
    ConstructorParameterDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassStaticMethodParameterDefinition;
export type InterfaceDefinitions = InterfaceDefinition | InterfaceMethodParameterDefinition | InterfaceMethodParameterDefinition | InterfacePropertyDefinition |
    InterfaceNewSignatureDefinition | InterfaceNewSignatureParameterDefinition;
export type EnumDefinitions = EnumDefinition | EnumMemberDefinition;
export type FunctionDefinitions = CallSignatureDefinition | CallSignatureParameterDefinition | FunctionDefinition | FunctionParameterDefinition;
export type NamespaceDefinitions = NamespaceDefinition;
export type GeneralDefinitions = TypeParameterDefinition<TypeParameteredDefinitions> | TypePropertyDefinition | DecoratorDefinition<DecoratedDefinitions> | TypeAliasDefinition;
export type VariableDefinitions = VariableDefinition;

// "ed" definitions
export type DecoratedDefinitions = ClassDefinition | ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition |
    ClassMethodParameterDefinition | ConstructorParameterDefinition;
export type TypeParameteredDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | InterfaceMethodDefinition | ClassMethodDefinition |
    ClassStaticMethodDefinition | TypeAliasDefinition;
export type ModuledDefinitions = FileDefinition | NamespaceDefinition;
// "able" definitions
export type WriteableDefinitions = FileDefinition | NamespaceDefinition | ClassDefinition| InterfaceDefinition | FunctionDefinition | EnumDefinition |
    VariableDefinition | TypeAliasDefinition;
export type ExportableDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
// other
export type BaseFunctionDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;
export type FunctionWriteableDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;
export type MainDefinitions = ClassDefinition | FunctionDefinition | InterfaceDefinition | EnumDefinition | NamespaceDefinition | VariableDefinition | TypeAliasDefinition;
export type ClassMethodDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition;
export type ClassMethodParameterDefinitions = ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition;
export type ParameterDefinitions = FunctionParameterDefinition | InterfaceMethodParameterDefinition | ClassMethodParameterDefinition | ClassStaticMethodParameterDefinition |
                                   InterfaceNewSignatureParameterDefinition | ConstructorParameterDefinition | CallSignatureParameterDefinition;
export type ParameteredDefinitions = FunctionDefinition | InterfaceMethodDefinition | ClassMethodDefinition | InterfaceNewSignatureDefinition | ConstructorDefinition |
                                     CallSignatureDefinition;
export type PropertyDefinitions = InterfacePropertyDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition;
export type MethodDefinitions = InterfaceMethodDefinition | ClassMethodDefinition;
export type MethodParameterDefinitions = InterfaceMethodParameterDefinition | ClassMethodParameterDefinition;
