import {ClassDefinition, EnumDefinition, FileDefinition, FunctionDefinition,
        InterfaceDefinition, IBaseNamedDefinition, IExportableDefinition} from "./../definitions";
import {TypeChecker, KeyValueCache} from "./../utils";
import * as ts from "typescript";

export class DefinitionCache {
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();
    private enums = new KeyValueCache<ts.Symbol, EnumDefinition>();
    private files = new KeyValueCache<ts.SourceFile, FileDefinition>();
    private functions = new KeyValueCache<ts.Symbol, FunctionDefinition>();
    private interfaces = new KeyValueCache<ts.Symbol, InterfaceDefinition>();

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

            fileDefinition.fillImports(this.typeChecker, this, sourceFile);
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
                    this.typeChecker.getExtendsSymbols(symbol).map(base => this.getClassDefinition(base)),
                    this.typeChecker.getImplementsSymbols(symbol).map(base => this.getClassOrInterfaceDefinition(base)));

                this.classes.add(symbol, classDefinition);
            }
        }

        return classDefinition;
    }

    getInterfaceDefinition(symbol: ts.Symbol) {
        let interfaceDefinition: InterfaceDefinition;

        if (InterfaceDefinition.isInterfaceDefinition(symbol)) {
            interfaceDefinition = this.interfaces.get(symbol);

            if (interfaceDefinition == null) {
                interfaceDefinition = new InterfaceDefinition(
                    this.typeChecker,
                    symbol,
                    this.typeChecker.getExtendsSymbols(symbol).map((base) => this.getClassOrInterfaceDefinition(base)));
                this.interfaces.add(symbol, interfaceDefinition);
            }
        }

        return interfaceDefinition;
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

    getClassOrInterfaceDefinition(symbol: ts.Symbol): ClassDefinition | InterfaceDefinition {
        return this.getClassDefinition(symbol) || this.getInterfaceDefinition(symbol);
    }

    getDefinition(symbol: ts.Symbol): IBaseNamedDefinition & IExportableDefinition {
        return this.getClassDefinition(symbol) ||
            this.getFunctionDefinition(symbol) ||
            this.getInterfaceDefinition(symbol) ||
            this.getEnumDefinition(symbol);
    }
}
