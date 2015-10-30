import {ClassDefinition} from "./../definitions";
import {TypeChecker} from "./../utils";
import * as ts from "typescript";

export class DefinitionCache {
    private classes = new CacheContainer<ClassDefinition>();

    constructor(private typeChecker: TypeChecker) {
    }

    getClassDefinition(symbol: ts.Symbol) {
        let classDefinition = this.classes.get(symbol);

        if (classDefinition == null) {
            classDefinition = new ClassDefinition(
                this.typeChecker,
                symbol,
                this.typeChecker.getBaseTypeSymbols(symbol).map((base) => this.getClassDefinition(base)));

            this.classes.add(symbol, classDefinition);
        }

        return classDefinition;
    }
}

interface CacheItem<T> {
    symbol: ts.Symbol;
    definition: T;
}

class CacheContainer<T> {
    private cacheItems: CacheItem<T>[] = [];

    get(symbol: ts.Symbol) {
        for (let cacheItem of this.cacheItems) {
            if (cacheItem.symbol === symbol) {
                return cacheItem.definition;
            }
        }

        return null;
    }

    add(symbol: ts.Symbol, definition: T) {
        this.cacheItems.push({ symbol: symbol, definition: definition });
    }
}
