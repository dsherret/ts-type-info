import * as ts from "typescript";
import {Serializable} from "./../../utils";

export interface INamedDefinition {
    fillName(symbol: ts.Symbol): void;
    name: string;
}

export abstract class NamedDefinition {
    private _name: string;

    fillName(symbol: ts.Symbol) {
        this._name = symbol.getName();
    }

    @Serializable
    get name() {
        return this._name;
    }

}
