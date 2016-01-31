import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
    fillName(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class NamedDefinition implements INamedDefinition {
    name: string;

    fillName(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.name = symbol.getName();

        if (this.name === "default") {
            const localSymbol = typeChecker.getLocalSymbolFromSymbol(symbol);
            this.name = localSymbol.getName();
        }
    }
}
