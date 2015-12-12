import * as ts from "typescript";

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
    fillName(symbol: ts.Symbol): void;
}

export abstract class NamedDefinition {
    private _name: string;

    fillName(symbol: ts.Symbol) {
        this._name = symbol.getName();
    }

    get name() {
        return this._name;
    }

}
