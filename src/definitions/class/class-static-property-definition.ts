import * as ts from "typescript";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";
import {DefinitionType} from "./../base";
import {TypeChecker} from "./../../utils";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.ClassStaticProperty);
    }
}
