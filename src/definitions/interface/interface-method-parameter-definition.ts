import * as ts from "typescript";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {TypeChecker} from "./../../utils";
import {InterfaceMethodDefinition} from "./interface-method-definition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: InterfaceMethodDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.InterfaceMethodParameter);
    }
}
