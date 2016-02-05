import * as ts from "typescript";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./class-static-method-parameter-definition";
import {ClassDefinition} from "./class-definition";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        super(typeChecker, symbol, ClassStaticMethodParameterDefinition, parent, DefinitionType.ClassStaticMethod);
    }
}
