import * as ts from "typescript";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: InterfaceDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.InterfaceProperty);
    }
}
