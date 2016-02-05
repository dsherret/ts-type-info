import * as ts from "typescript";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassStaticMethodDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.ClassStaticMethodParameter);
    }
}
