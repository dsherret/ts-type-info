import * as ts from "typescript";
import {BasePropertyDefinition} from "./../base/base-property-definition";
import {Type} from "./../../expressions";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: Type) {
        super(typeChecker, symbol, parent, DefinitionType.TypeProperty);
    }
}
