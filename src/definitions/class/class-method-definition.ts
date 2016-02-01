import * as ts from "typescript";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {TypeChecker} from "./../../utils";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol, ClassMethodParameterDefinition);
    }
}
