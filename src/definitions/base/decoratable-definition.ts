import * as ts from "typescript";
import {DecoratorDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface IDecoratableDefinition<ThisType> {
    decorators: DecoratorDefinition<ThisType>[];
    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class DecoratableDefinition<ThisType> implements IDecoratableDefinition<ThisType> {
    decorators: DecoratorDefinition<ThisType>[];

    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.decorators = [];
        for (let declaration of symbol.getDeclarations()) {
            if (declaration.decorators != null) {
                for (let decorator of declaration.decorators) {
                    this.decorators.push(new DecoratorDefinition<ThisType>(typeChecker, decorator));
                }
            }
        }
    }
}
