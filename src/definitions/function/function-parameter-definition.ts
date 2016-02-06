import * as ts from "typescript";
import {TypeChecker} from "./../../utils";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./function-definition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: FunctionDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.FunctionParameter);
    }
}
