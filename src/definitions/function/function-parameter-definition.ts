import * as ts from "typescript";
import {BaseParameterDefinition} from "./base";
import {FunctionDefinition} from "./function-definition";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: FunctionDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.FunctionParameter);
    }
}
