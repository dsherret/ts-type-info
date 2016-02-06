import * as ts from "typescript";
import {TypeChecker} from "./../../utils";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: InterfaceDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.InterfaceProperty);
    }
}
