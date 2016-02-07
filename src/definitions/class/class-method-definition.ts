import * as ts from "typescript";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {TypeChecker, applyMixins} from "./../../utils";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        super(typeChecker, symbol, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(typeChecker, symbol);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
