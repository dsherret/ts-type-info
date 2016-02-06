import * as ts from "typescript";
import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {TypeChecker} from "./../../utils";
import {InterfaceDefinition} from "./interface-definition";
import {InterfaceMethodParameterDefinition} from "./interface-method-parameter-definition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: InterfaceDefinition) {
        super(typeChecker, symbol, InterfaceMethodParameterDefinition, DefinitionType.InterfaceMethod);
        this.parent = parent;
    }
}
