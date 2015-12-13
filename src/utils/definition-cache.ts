import {ClassDefinition, EnumDefinition, FunctionDefinition} from "./../definitions";
import {TypeChecker, KeyValueCache} from "./../utils";
import * as ts from "typescript";

export class DefinitionCache {
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();
    private enums = new KeyValueCache<ts.Symbol, EnumDefinition>();
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

    getEnumDefinition(symbol: ts.Symbol) {
        let enumDefinition = this.enums.get(symbol);

        if (enumDefinition == null) {
            enumDefinition = new EnumDefinition(this.typeChecker, symbol);
            this.enums.add(symbol, enumDefinition);
        }

        return enumDefinition;
    }

    getFunctionDefinition(symbol: ts.Symbol) {
        let functionDefinition = this.functions.get(symbol);

        if (functionDefinition == null) {
            functionDefinition = new FunctionDefinition(this.typeChecker, symbol);
            this.functions.add(symbol, functionDefinition);
        }

        return functionDefinition;
    }
}
