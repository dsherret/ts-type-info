import * as ts from "typescript";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./class-static-method-parameter-definition";
import {TypeChecker} from "./../../utils";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol, ClassStaticMethodParameterDefinition);
    }
}
