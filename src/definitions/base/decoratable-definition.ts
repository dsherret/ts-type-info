import * as ts from "typescript";
import {DecoratorDefinition} from "./decorator-definition";
import {TypeChecker} from "./../../utils";

export interface IDecoratableDefinition {
    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    decorators: DecoratorDefinition[];
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    private _decorators: DecoratorDefinition[];

    fillDecorators(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._decorators = [];
        for (let declaration of symbol.getDeclarations()) {
            if (declaration.decorators != null) {
                for (let decorator of declaration.decorators) {
                    this._decorators.push(new DecoratorDefinition(typeChecker, decorator));
                }
            }
        }
    }

    get decorators() {
        return this._decorators;
    }
}
