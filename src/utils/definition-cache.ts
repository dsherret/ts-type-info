import * as ts from "typescript";
import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition,
        InterfaceDefinition, VariableDefinition, MainDefinitions, ExportableDefinitions, TypeAliasDefinition} from "./../definitions";
import {Expression} from "./../expressions";
import {TypeChecker, KeyValueCache} from "./../utils";

export class DefinitionCache {
    private namespaces = new KeyValueCache<ts.Symbol, NamespaceDefinition>();
    private classes = new KeyValueCache<ts.Symbol, ClassDefinition>();
    private enums = new KeyValueCache<ts.Symbol, EnumDefinition>();
    private files = new KeyValueCache<ts.SourceFile, FileDefinition>();
    private functions = new KeyValueCache<ts.Symbol, FunctionDefinition>();
    private interfaces = new KeyValueCache<ts.Symbol, InterfaceDefinition>();
    private variables = new KeyValueCache<ts.Symbol, VariableDefinition>();
    private typeAliases = new KeyValueCache<ts.Symbol, TypeAliasDefinition>();

    constructor(private typeChecker: TypeChecker) {
    }

    getDefinitionOrExpressionFromSymbol(symbol: ts.Symbol): Expression | MainDefinitions {
        if (this.typeChecker.symbolHasFlag(symbol, ts.SymbolFlags.Alias)) {
            const aliasedSymbol = this.typeChecker.getAliasedSymbol(symbol);
            return this.getImportDefinition(aliasedSymbol);
        }
        else {
            const node = this.typeChecker.getDeclarationFromSymbol(symbol);
            return this.getDefinitionOrExpressionFromNode(node);
        }
    }

    getDefinitionOrExpressionFromNode(node: ts.Node): Expression | MainDefinitions {
        const expressionStatement = node as ts.ExpressionStatement;
        if (expressionStatement.expression != null) {
            return new Expression(this.typeChecker, expressionStatement.expression);
        }
        else {
            return this.getImportDefinition(this.typeChecker.getSymbolAtLocation(node));
        }
    }

    getDefinition(symbol: ts.Symbol): MainDefinitions {
        return this.getImportDefinition(symbol);
    }

    getImportDefinition(symbol: ts.Symbol): ExportableDefinitions {
        return this.getClassDefinition(symbol) ||
            this.getFunctionDefinition(symbol) ||
            this.getInterfaceDefinition(symbol) ||
            this.getEnumDefinition(symbol) ||
            this.getNamespaceDefinition(symbol) ||
            this.getVariableDefinition(symbol);
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

    getVariableDefinition(symbol: ts.Symbol) {
        let variableDefinition: VariableDefinition;

        if (this.typeChecker.isSymbolVariable(symbol)) {
            variableDefinition = this.variables.get(symbol);

            /* istanbul ignore else */
            if (variableDefinition == null) {
                variableDefinition = new VariableDefinition(this.typeChecker, symbol);
                this.variables.add(symbol, variableDefinition);
            }
        }

        return variableDefinition;
    }

    getTypeAliasDefinition(symbol: ts.Symbol) {
        let typeAliasDefinition: TypeAliasDefinition;

        if (this.typeChecker.isSymbolTypeAlias(symbol)) {
            typeAliasDefinition = this.typeAliases.get(symbol);

            /* istanbul ignore else */
            if (typeAliasDefinition == null) {
                typeAliasDefinition = new TypeAliasDefinition(this.typeChecker, symbol);
                this.typeAliases.add(symbol, typeAliasDefinition);
            }
        }

        return typeAliasDefinition;
    }
}
