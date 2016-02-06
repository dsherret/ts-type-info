import * as ts from "typescript";
import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {ClassConstructorParameterDefinition} from "./class-constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";
import {applyMixins, TypeChecker} from "./../../utils";

export class ClassConstructorDefinition extends BaseDefinition implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        super(DefinitionType.ClassConstructor);
        this.fillParametersBySymbol(typeChecker, symbol, ClassConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
    fillParametersBySymbol: (
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        typeChecker: TypeChecker,
        signature: ts.Signature,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
}

applyMixins(ClassConstructorDefinition, [ParameteredDefinition]);
