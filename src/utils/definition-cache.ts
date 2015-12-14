import {ClassDefinition, EnumDefinition, FileDefinition, FunctionDefinition, IBaseNamedDefinition, IExportableDefinition} from "./../definitions";
import {TypeChecker, KeyValueCache} from "./../utils";
import * as ts from "typescript";

export class DefinitionCache {
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();
    private enums = new KeyValueCache<ts.Symbol, EnumDefinition>();
    private files = new KeyValueCache<ts.SourceFile, FileDefinition>();
    private functions = new KeyValueCache<ts.Symbol, FunctionDefinition>();

    constructor(private typeChecker: TypeChecker) {
    }

    getFileDefinition(sourceFile: ts.SourceFile) {
        let fileDefinition = this.files.get(sourceFile);

        if (fileDefinition == null) {
            fileDefinition = new FileDefinition(
                this.typeChecker,
                this,
                sourceFile);

            this.files.add(sourceFile, fileDefinition);

            fileDefinition.fillReExports(this.typeChecker, this, sourceFile);
        }

        return fileDefinition;
    }

    getClassDefinition(symbol: ts.Symbol) {
        let classDefinition: ClassDefinition;

        if (ClassDefinition.isClassDefinition(symbol)) {
            classDefinition = this.classes.get(symbol);

            if (classDefinition == null) {
                classDefinition = new ClassDefinition(
                    this.typeChecker,
                    symbol,
                    this.typeChecker.getBaseTypeSymbols(symbol).map((base) => this.getClassDefinition(base)));

                this.classes.add(symbol, classDefinition);
            }
        }

        return classDefinition;
    }

    getEnumDefinition(symbol: ts.Symbol) {
        let enumDefinition: EnumDefinition;

        if (EnumDefinition.isEnumDefinition(symbol)) {
            enumDefinition = this.enums.get(symbol);

            if (enumDefinition == null) {
                enumDefinition = new EnumDefinition(this.typeChecker, symbol);
                this.enums.add(symbol, enumDefinition);
            }
        }

        return enumDefinition;
    }

    getFunctionDefinition(symbol: ts.Symbol) {
        let functionDefinition: FunctionDefinition;

        if (FunctionDefinition.isFunctionDefinition(symbol)) {
            functionDefinition = this.functions.get(symbol);

            if (functionDefinition == null) {
                functionDefinition = new FunctionDefinition(this.typeChecker, symbol);
                this.functions.add(symbol, functionDefinition);
            }
        }

        return functionDefinition;
    }

    getDefinition(symbol: ts.Symbol): IBaseNamedDefinition & IExportableDefinition {
        return this.getClassDefinition(symbol) ||
            this.getFunctionDefinition(symbol) ||
            this.getEnumDefinition(symbol);
    }
}
