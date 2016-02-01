import * as ts from "typescript";
import {DecoratorDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface IDecoratableDefinition {
    decorators: DecoratorDefinition<this>[];
    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol, parent: this): void;
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    decorators: DecoratorDefinition<this>[];

    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol, parent: this) {
        this.decorators = [];
        for (let declaration of symbol.getDeclarations()) {
            if (declaration.decorators != null) {
                for (let decorator of declaration.decorators) {
                    this.decorators.push(new DecoratorDefinition<this>(typeChecker, decorator, parent));
                }
            }
        }
    }
}
