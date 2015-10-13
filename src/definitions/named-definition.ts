import * as ts from "typescript";
import {DecoratorDefinition} from "./../definitions";
import {Serializable} from "./../utils";

export abstract class NamedDefinition {
    private _name: string;
    private _decorators: DecoratorDefinition[] = [];

    constructor(symbol: ts.Symbol) {
        this._name = symbol.getName();

        this.fillDecorators(symbol);
    }

    fillDecorators(symbol: ts.Symbol) {
        if (symbol.valueDeclaration != null && symbol.valueDeclaration.decorators != null) {
            for (let decorator of symbol.valueDeclaration.decorators) {
                this._decorators.push(new DecoratorDefinition(decorator));
            }
        }
    }

    @Serializable
    get name() {
        return this._name;
    }

    @Serializable
    get decorators() {
        return this._decorators;
    }
}
