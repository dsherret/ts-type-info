import {ClassDefinition} from "./../definitions";
import {TypeChecker, KeyValueCache} from "./../utils";
import * as ts from "typescript";

export class ClassDefinitionCache {
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();

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
