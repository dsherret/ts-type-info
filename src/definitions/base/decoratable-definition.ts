import * as ts from "typescript";
import {DecoratorDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface IDecoratableDefinition {
    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    decorators: DecoratorDefinition[];
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: DecoratorDefinition[];

    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.decorators = [];
        for (let declaration of symbol.getDeclarations()) {
            if (declaration.decorators != null) {
                for (let decorator of declaration.decorators) {
                    this.decorators.push(new DecoratorDefinition(typeChecker, decorator));
                }
            }
        }
    }
}
