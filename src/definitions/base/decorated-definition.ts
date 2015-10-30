import * as ts from "typescript";
import {DecoratorDefinition} from "./../../definitions";
import {Serializable} from "./../../utils";

export interface IDecoratedDefinition {
    fillDecorators(symbol: ts.Symbol): void;
    decorators: DecoratorDefinition[];
}

export abstract class DecoratedDefinition implements IDecoratedDefinition {
    private _decorators: DecoratorDefinition[] = [];

    fillDecorators(symbol: ts.Symbol) {
        if (symbol.valueDeclaration != null && symbol.valueDeclaration.decorators != null) {
            for (let decorator of symbol.valueDeclaration.decorators) {
                this._decorators.push(new DecoratorDefinition(decorator));
            }
        }
    }

    @Serializable
    get decorators() {
        return this._decorators;
    }
}
