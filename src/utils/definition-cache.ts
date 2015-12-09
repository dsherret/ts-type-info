import {ClassDefinition, FunctionDefinition} from "./../definitions";
import {TypeChecker, KeyValueCache} from "./../utils";
import * as ts from "typescript";

export class DefinitionCache {
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();
    private functions = new KeyValueCache<ts.Symbol, FunctionDefinition>();

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

    getFunctionDefinition(symbol: ts.Symbol) {
        let functionDefinition = this.functions.get(symbol);

        if (functionDefinition == null) {
            functionDefinition = new FunctionDefinition(
                this.typeChecker,
                symbol);

            this.functions.add(symbol, functionDefinition);
        }

        return functionDefinition;
    }
}
