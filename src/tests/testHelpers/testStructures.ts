export * from "./testStructures/expression";
export * from "./testStructures/base";
export * from "./testStructures/general";
export * from "./testStructures/class";
export * from "./testStructures/enum";
export * from "./testStructures/file";
export * from "./testStructures/function";
export * from "./testStructures/interface";
export * from "./testStructures/namespace";
export * from "./testStructures/variable";

import {FunctionTestStructure, FunctionParameterTestStructure} from "./testStructures/function";
import {InterfaceMethodParameterTestStructure, InterfaceMethodTestStructure} from "./testStructures/interface";
import {ClassMethodParameterTestStructure, ClassStaticMethodParameterTestStructure, ClassMethodTestStructure,
    ClassStaticMethodTestStructure, ClassConstructorTestStructure, ClassConstructorParameterTestStructure} from "./testStructures/class";
import {CallSignatureTestStructure, CallSignatureParameterTestStructure} from "./testStructures/general";

export type ClassMethodTestStructures = ClassMethodTestStructure | ClassStaticMethodTestStructure;
export type ClassMethodParameterTestStructures = ClassMethodParameterTestStructure | ClassStaticMethodParameterTestStructure;
export type ParameterTestStructures = FunctionParameterTestStructure | InterfaceMethodParameterTestStructure | ClassMethodParameterTestStructure |
    ClassStaticMethodParameterTestStructure | ClassConstructorParameterTestStructure | CallSignatureParameterTestStructure;
export type ParameteredTestStructures = FunctionTestStructure | InterfaceMethodTestStructure | ClassMethodTestStructure | ClassConstructorTestStructure | CallSignatureTestStructure;
