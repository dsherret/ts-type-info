import * as ts from "typescript";
import {TypeChecker} from "./../../utils";
import {IModuledDefinition} from "./moduled-definition";

export interface IBaseNamedDefinition<ParentType> {
    name: string;
    parent: ParentType;
}

export interface INamedDefinition<ParentType> extends IBaseNamedDefinition<ParentType> {
    fillName(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class NamedDefinition<ParentType> implements INamedDefinition<ParentType> {
    name: string;
    parent: ParentType;

    fillName(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.name = symbol.getName();

        if (this.name === "default") {
            const localSymbol = typeChecker.getLocalSymbolFromSymbol(symbol);
            this.name = localSymbol.getName();
        }
    }
}
