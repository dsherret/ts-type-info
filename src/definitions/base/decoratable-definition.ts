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
        if (symbol.valueDeclaration != null && symbol.valueDeclaration.decorators != null) {
            for (let decorator of symbol.valueDeclaration.decorators) {
                this._decorators.push(new DecoratorDefinition(decorator));
            }
        }
    }

    get decorators() {
        return this._decorators;
    }
}
