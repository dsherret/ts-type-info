import * as ts from "typescript";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./class-method-definition";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassMethodDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.ClassMethodParameter);
    }
}
