import * as ts from "typescript";
import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        MainDefinitions, TypeAliasDefinition, ImportDefinition} from "./../definitions";
import {Expression} from "./../expressions";
import {TypeChecker, KeyValueCache} from "./../utils";
import {WrappedSymbolNode, WrappedExpression} from "./../wrappers";

export class DefinitionCache {
    private definitionByNode = new KeyValueCache<ts.Node, MainDefinitions>();
    private files = new KeyValueCache<ts.SourceFile, FileDefinition>();

    constructor(private typeChecker: TypeChecker) {
    }

    getImportDefinitions(symbolNode: WrappedSymbolNode, parent: FileDefinition) {
        let importDefinitions: ImportDefinition[] = [];

        for (const fileImportSymbol of this.typeChecker.getFileImportSymbols(symbolNode.getSourceFile())) {
            importDefinitions.push(...this.getImportDefinitionsFromFileImportSymbol(fileImportSymbol, parent));
        }

        return importDefinitions;
    }

    getReExportDefinitions(symbolNode: WrappedSymbolNode, parent: FileDefinition) {
        let reExportDefinitions: ImportDefinition[] = [];

        for (const fileImportSymbol of this.typeChecker.getFileReExportSymbols(symbolNode.getSourceFile())) {
            reExportDefinitions.push(...this.getImportDefinitionsFromFileImportSymbol(fileImportSymbol, parent));
        }

        return reExportDefinitions;
    }

    private getImportDefinitionsFromFileImportSymbol(fileImportSymbol: ts.Symbol, parent: FileDefinition) {
        const definitions = this.getDefinitionsBySymbol(fileImportSymbol);

        return (definitions || []).map(definition => new ImportDefinition(
            this.getFileDefinitionFromSourceFile(this.typeChecker.getSourceFileOfSymbol(fileImportSymbol)),
            definition,
            parent
        ));
    }

    getDefaultExport(symbolNode: WrappedSymbolNode) {
        const sourceFileSymbol = this.typeChecker.getSymbolAtLocation(symbolNode.getSourceFile());

        if (sourceFileSymbol != null) {
            const defaultExport = sourceFileSymbol.exports["default"];

            if (defaultExport != null) {
                return this.getDefinitionsOrExpressionFromSymbol(defaultExport);
            }
        }
    }

    getDefinitionsBySymbol(symbol: ts.Symbol) {
        return (symbol.getDeclarations() || []).map(node => {
            return this.getDefinition(new WrappedSymbolNode({
                typeChecker: this.typeChecker,
                parentNode: node.parent,
                sourceFile: node.getSourceFile(),
                node: node,
                symbol: symbol
            }));
        }).filter(d => d != null);
    }

    getDefinition(symbolNode: WrappedSymbolNode) {
        return this.definitionByNode.get(symbolNode.getNode()) || this.createDefinition(symbolNode);
    }

    getFileDefinition(file: WrappedSymbolNode) {
        let fileDefinition = this.files.get(file.getSourceFile());

        /* istanbul ignore else */
        if (fileDefinition == null) {
            fileDefinition = new FileDefinition(this, file);

            this.files.add(file.getSourceFile(), fileDefinition);
        }

        return fileDefinition;
    }

    getFileDefinitionFromSourceFile(sourceFile: ts.SourceFile) {
        return this.files.get(sourceFile);
    }

    getDefinitionsOrExpressionFromSymbol(symbol: ts.Symbol): Expression | MainDefinitions[] {
        if (this.typeChecker.symbolHasFlag(symbol, ts.SymbolFlags.Alias)) {
            const aliasedSymbol = this.typeChecker.getAliasedSymbol(symbol);
            return this.getDefinitionsBySymbol(aliasedSymbol);
        }
        else {
            const node = this.typeChecker.getDeclarationFromSymbol(symbol);
            return this.getDefinitionsOrExpressionFromNodeAndSymbol(node, symbol);
        }
    }

    getDefinitionsOrExpressionFromNodeAndSymbol(node: ts.Node, symbol: ts.Symbol): Expression | MainDefinitions[] {
        const expressionStatement = node as ts.ExpressionStatement;
        if (expressionStatement.expression != null) {
            const wrappedExpression = new WrappedExpression({
                typeChecker: this.typeChecker,
                sourceFile: node.getSourceFile(),
                expression: expressionStatement.expression
            });
            return new Expression(wrappedExpression);
        }
        else {
            return this.getDefinitionsBySymbol(symbol);
        }
    }

    private createDefinition(symbolNode: WrappedSymbolNode) {
        let definition: MainDefinitions;

        if (symbolNode.isFunction()) {
            definition = new FunctionDefinition(symbolNode);
        }
        else if (symbolNode.isClass()) {
            definition = new ClassDefinition(symbolNode);
        }
        else if (symbolNode.isInterface()) {
            definition = new InterfaceDefinition(symbolNode);
        }
        else if (symbolNode.isEnum()) {
            definition = new EnumDefinition(symbolNode);
        }
        else if (symbolNode.isVariable()) {
            definition = new VariableDefinition(symbolNode);
        }
        else if (symbolNode.isTypeAlias()) {
            definition = new TypeAliasDefinition(symbolNode);
        }
        else if (symbolNode.isNamespace()) {
            definition = new NamespaceDefinition(this, symbolNode);
        }
        else if (symbolNode.isExportAssignment() || symbolNode.isExportDeclaration()) {
            // ignore exports here, handled in ExportableDefinition
        }
        else if (symbolNode.isTypeParameter()) {
            // ignore type parameter here, handled in TypedParameterDefinition
        }
        else {
            console.log(`Unknown node kind: ${symbolNode.nodeKindToString()}`);
        }

        if (definition != null) {
            this.definitionByNode.add(symbolNode.getNode(), definition);
        }

        return definition;
    }
}
