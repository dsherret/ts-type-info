import * as ts from "typescript";
import {DecoratorDefinition} from "./../decorator-definition";

export interface IDecoratableDefinition {
    fillDecorators(symbol: ts.Symbol): void;
    decorators: DecoratorDefinition[];
}

export abstract class DecoratableDefinition implements IDecoratableDefinition {
    private _decorators: DecoratorDefinition[];

    fillDecorators(symbol: ts.Symbol) {
        this._decorators = [];
        for (let declaration of symbol.getDeclarations()) {
            if (declaration.decorators != null) {
                for (let decorator of declaration.decorators) {
                    this._decorators.push(new DecoratorDefinition(decorator));
                }
            }
        }
    }

    get decorators() {
        return this._decorators;
    }
}
