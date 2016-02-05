import * as ts from "typescript";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        super(typeChecker, symbol, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
    }
}
