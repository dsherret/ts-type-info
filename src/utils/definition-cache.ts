import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition,
        InterfaceDefinition, IBaseNamedDefinition, IExportableDefinition} from "./../definitions";
import {TypeChecker, KeyValueCache} from "./../utils";
import * as ts from "typescript";

export class DefinitionCache {
    private namespaces = new KeyValueCache<ts.Symbol, NamespaceDefinition>();
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();
    private enums = new KeyValueCache<ts.Symbol, EnumDefinition>();
    private files = new KeyValueCache<ts.SourceFile, FileDefinition>();
    private functions = new KeyValueCache<ts.Symbol, FunctionDefinition>();
    private interfaces = new KeyValueCache<ts.Symbol, InterfaceDefinition>();

    constructor(private typeChecker: TypeChecker) {
    }

    getFileDefinition(sourceFile: ts.SourceFile) {
        let fileDefinition = this.files.get(sourceFile);

        /* istanbul ignore else */
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

    getNamespaceDefinition(symbol: ts.Symbol) {
        let namespaceDefinition: NamespaceDefinition;

        if (this.typeChecker.isSymbolNamespace(symbol)) {
            namespaceDefinition = this.namespaces.get(symbol);

            /* istanbul ignore else */
            if (namespaceDefinition == null) {
                namespaceDefinition = new NamespaceDefinition(this.typeChecker, symbol);

                this.namespaces.add(symbol, namespaceDefinition);

                namespaceDefinition.fillMembersBySymbol(this.typeChecker, this, symbol);
            }
        }

        return namespaceDefinition;
    }

    getClassDefinition(symbol: ts.Symbol) {
        let classDefinition: ClassDefinition;

        if (this.typeChecker.isSymbolClass(symbol)) {
            classDefinition = this.classes.get(symbol);

            /* istanbul ignore else */
            if (classDefinition == null) {
                classDefinition = new ClassDefinition(
                    this.typeChecker,
                    symbol,
                    this.typeChecker.getExtendsTypeExpressions(symbol),
                    this.typeChecker.getImplementsTypeExpressions(symbol));

                this.classes.add(symbol, classDefinition);
            }
        }

        return classDefinition;
    }

    getInterfaceDefinition(symbol: ts.Symbol) {
        let interfaceDefinition: InterfaceDefinition;

        if (this.typeChecker.isSymbolInterface(symbol)) {
            interfaceDefinition = this.interfaces.get(symbol);

            /* istanbul ignore else */
            if (interfaceDefinition == null) {
                interfaceDefinition = new InterfaceDefinition(
                    this.typeChecker,
                    symbol,
                    this.typeChecker.getExtendsTypeExpressions(symbol));
                this.interfaces.add(symbol, interfaceDefinition);
            }
        }

        return interfaceDefinition;
    }

    getEnumDefinition(symbol: ts.Symbol) {
        let enumDefinition: EnumDefinition;

        if (this.typeChecker.isSymbolEnum(symbol)) {
            enumDefinition = this.enums.get(symbol);

            /* istanbul ignore else */
            if (enumDefinition == null) {
                enumDefinition = new EnumDefinition(this.typeChecker, symbol);
                this.enums.add(symbol, enumDefinition);
            }
        }

        return enumDefinition;
    }

    getFunctionDefinition(symbol: ts.Symbol) {
        let functionDefinition: FunctionDefinition;

        if (this.typeChecker.isSymbolFunction(symbol)) {
            functionDefinition = this.functions.get(symbol);

            /* istanbul ignore else */
            if (functionDefinition == null) {
                functionDefinition = new FunctionDefinition(this.typeChecker, symbol);
                this.functions.add(symbol, functionDefinition);
            }
        }

        return functionDefinition;
    }

    getDefinition(symbol: ts.Symbol): IBaseNamedDefinition {
        return this.getImportDefinition(symbol);
    }

    getImportDefinition(symbol: ts.Symbol): IBaseNamedDefinition & IExportableDefinition {
        return this.getClassDefinition(symbol) ||
            this.getFunctionDefinition(symbol) ||
            this.getInterfaceDefinition(symbol) ||
            this.getEnumDefinition(symbol) ||
            this.getNamespaceDefinition(symbol);
    }
}
