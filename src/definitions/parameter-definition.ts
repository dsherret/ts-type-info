import * as ts from "typescript";
import {TypedDefinition} from "./../definitions";
import {TypeChecker} from "./../utils";

// todo: add isOptional parameter

export class ParameterDefinition extends TypedDefinition {
    constructor(typeChecker: TypeChecker, paramSymbol: ts.Symbol) {
        super(typeChecker, paramSymbol);
    }
}
