﻿import * as ts from "typescript";
import {Logger} from "./../../utils/logger";
import {tryGet} from "./../../utils/try-get";
import {TypeGuards} from "./../../utils/type-guards";
import {ClassConstructorParameterScope, NamespaceDeclarationType, Scope, VariableDeclarationType} from "./../../definitions";
import {INode} from "./../node";
import {ISymbol} from "./../symbol";
import {ISignature} from "./../signature";
import {IExpression} from "./../expression";
import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";
import {TsExpression} from "./ts-expression";
import {TsSignature} from "./ts-signature";
import {TsSymbol} from "./ts-symbol";
import {TsType} from "./ts-type";
import {TsTypeExpression} from "./ts-type-expression";
import {TsSourceFileChildOptions, TsSourceFileChild} from "./ts-source-file-child";

export interface TsNodeOptions extends TsSourceFileChildOptions {
    node: ts.Node;
}

export class TsNode extends TsSourceFileChild implements INode {
    private __tsSymbol: ISymbol;
    private node: ts.Node;

    private get tsSymbol() {
        if (this.__tsSymbol == null) {
            this.__tsSymbol = this.createSymbol(this.typeChecker.getSymbolAtLocation(this.node));
        }

        return this.__tsSymbol;
    }

    constructor(opts: TsNodeOptions, tsSymbol?: ISymbol) {
        super(opts);

        if (opts.node == null) {
            throw new Error("Passed in ts.Node cannot be null.");
        }

        this.node = opts.node;
        this.__tsSymbol = tsSymbol;
    }

    getName() {
        let name: string;
        const symbol = this.tsSymbol;

        if (symbol != null) {
            name = symbol.getName();

            if (name === "default") {
                name = this.getLocalSymbol().getName();
            }
        }

        return name || "";
    }

    getSymbol() {
        return this.tsSymbol;
    }

    forEachChild(callback: (node: INode) => void) {
        if (this.isNamespace()) {
            this.forEachLocalSymbol(callback);
        }
        else {
            this.forEachChildNode(callback);
        }
    }

    getClassConstructorParameterScope() {
        const nodeFlags = this.node.flags;

        if ((nodeFlags & ts.NodeFlags.Private) !== 0) {
            return ClassConstructorParameterScope.Private;
        }
        else if ((nodeFlags & ts.NodeFlags.Protected) !== 0) {
            return ClassConstructorParameterScope.Protected;
        }
        else if ((nodeFlags & ts.NodeFlags.Public) !== 0) {
            return ClassConstructorParameterScope.Public;
        }
        else {
            return ClassConstructorParameterScope.None;
        }
    }

    getConstantValue() {
        return this.typeChecker.getConstantValue(this.node);
    }

    getDecoratorName() {
        const decorator = this.node as ts.Decorator;
        return this.getNameFromExpression(decorator.expression);
    }

    getDecoratorArguments() {
        const decorator = this.node as ts.Decorator;
        return this.getArgumentsFromExpression(decorator.expression);
    }

    getDecorators() {
        return (this.node.decorators || []).map(decorator => this.createNode(decorator));
    }

    getDefaultExpression() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.initializer != null ? this.createTsExpression(propertyDeclaration.initializer) : null;
    }

    getDefaultImportNameAndSymbol() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        const clause = importDeclaration.importClause;

        if (clause.name != null) {
            return {
                name: clause.name.getText(),
                symbol: this.createSymbol(this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(clause.name)))
            };
        }
        else {
            return null;
        }
    }

    getExpression() {
        let expression: IExpression;
        const expressionStatement = this.node as ts.ExpressionStatement;

        if (expressionStatement.expression != null) {
            expression = this.createTsExpression(expressionStatement.expression);
        }

        return expression;
    }

    getHeritageNodes(): INode[] {
        const classDeclaration = this.node as ts.ClassDeclaration;
        return (classDeclaration.heritageClauses || []).map(heritageClause => this.createNode(heritageClause));
    }

    getImplementsTypeExpressions() {
        const symbolType = this.tsSymbol.getDeclaredType();
        const implementsIndex = symbolType.getBaseTypeExpressions().length > 0 ? 1 : 0;
        const heritageNodes = this.getHeritageNodes();

        if (heritageNodes.length > implementsIndex) {
            return heritageNodes[implementsIndex].getTypes();
        }

        return [];
    }

    getLocalSymbol() {
        return this.createSymbol(this.typeChecker.getLocalSymbolFromNode(this.node));
    }

    getModuleSpecifierText() {
        const importDeclaration = this.node as ts.ImportDeclaration;

        if (importDeclaration.moduleSpecifier != null) {
            return (importDeclaration.moduleSpecifier.getText() || "").replace(/["']/g, "");
        }
        else {
            return null;
        }
    }

    getFileNameOfModuleSpecifier() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        let fileName: string = null;

        if (importDeclaration.moduleSpecifier != null) {
            const moduleSymbol = this.typeChecker.getSymbolAtLocation(importDeclaration.moduleSpecifier);
            const sourceFile = this.typeChecker.getDeclarationFromSymbol(moduleSymbol).getSourceFile();

            fileName = sourceFile.fileName;
        }

        return fileName;
    }

    getModuleSpecifierSymbol() {
       const importDeclaration = this.node as ts.ImportDeclaration;
       return this.createSymbol(this.typeChecker.getSymbolAtLocation(importDeclaration.moduleSpecifier));
    }

    getNamedExportSymbolsByName() {
        const exportSymbols: { [name: string]: ISymbol; } = {};
        const exportDeclaration = this.node as ts.ExportDeclaration;

        exportDeclaration.exportClause.elements.forEach(element => {
            exportSymbols[element.name.getText()] = this.createSymbol(this.typeChecker.getSymbolAtLocation(element));
        });

        return exportSymbols;
    }

    getNamedImportSymbolsByName(): { [name: string]: ISymbol; } {
        const symbolsByName: { [name: string]: ISymbol; } = {};
        const importDeclaration = this.node as ts.ImportDeclaration;
        const namedBindings = importDeclaration.importClause.namedBindings as ts.NamedImportsOrExports;

        if (namedBindings != null) {
            (namedBindings.elements || []).forEach(element => {
                const symbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(element));

                /* istanbul ignore else */
                if (symbol != null) {
                    symbolsByName[element.name.text] = this.createSymbol(symbol);
                }
                else {
                    Logger.warn(`Unknown symbol: ${element.name.text}`);
                }
            });
        }

        return symbolsByName;
    }

    getNamespaceDeclarationType() {
        const nodeFlags = this.node.flags;

        if ((nodeFlags & ts.NodeFlags.Namespace) !== 0) {
            return NamespaceDeclarationType.Namespace;
        }
        else {
            return NamespaceDeclarationType.Module;
        }
    }

    getParameters() {
        const parameters = (this.node as ts.SignatureDeclaration).parameters;
        return parameters.filter(p => p != null).map(p => this.createNode(p));
    }

    getReturnTypeExpression() {
        const tsType = this.typeChecker.getReturnTypeOfNode(this.node);

        return this.getTypeExpressionFromType(tsType);
    }

    getScope() {
        const nodeFlags = this.node.flags;

        if ((nodeFlags & ts.NodeFlags.Private) !== 0) {
            return Scope.Private;
        }
        else if ((nodeFlags & ts.NodeFlags.Protected) !== 0) {
            return Scope.Protected;
        }
        else {
            return Scope.Public;
        }
    }

    getSignatureFromThis(): ISignature {
        return new TsSignature({
            typeChecker: this.typeChecker,
            tsSourceFile: this.tsSourceFile,
            sourceFile: this.sourceFile,
            tsCache: this.tsCache,
            signature: this.typeChecker.getSignatureFromNode(this.node)
        });
    }

    getStarImportName() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        const namespaceImport = importDeclaration.importClause.namedBindings as ts.NamespaceImport;

        return namespaceImport.name.getText();
    }

    getStarSymbol() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        const namespaceImport = importDeclaration.importClause.namedBindings as ts.NamespaceImport;

        return this.createSymbol(this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(namespaceImport.name)));
    }

    getTypeExpression(): ITypeExpression {
        return tryGet(this, () => this.getTypeExpressionAtLocation(this.node));
    }

    getTypeParameters() {
        type typeParameteredTypes = ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.FunctionDeclaration;
        let typeParameteredDeclaration = this.node as typeParameteredTypes;

        return (typeParameteredDeclaration.typeParameters || []).map(typeParameter => {
            return this.createNode(typeParameter);
        });
    }

    getTypeParameterConstraintTypeExpression() {
        const constraint = (this.node as ts.TypeParameterDeclaration).constraint;
        return constraint == null ? null : this.getTypeExpressionAtLocation((this.node as ts.TypeParameterDeclaration).constraint);
    }

    getTypes(): ITypeExpression[] {
        const clause = this.node as ts.HeritageClause;
        return (clause.types || [])
            .map(expressionWithTypeArguments => this.typeChecker.getTypeAtLocation(expressionWithTypeArguments))
            .filter(type => type != null)
            .map(type => this.createTypeExpression(type));
    }

    getVariableDeclarationType() {
        const nodeFlags = this.node.parent.flags;

        if (nodeFlags & ts.NodeFlags.Let) {
            return VariableDeclarationType.Let;
        }
        else if (nodeFlags & ts.NodeFlags.Const) {
            return VariableDeclarationType.Const;
        }
        else {
            return VariableDeclarationType.Var;
        }
    }

    hasAbstractKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.AbstractKeyword);
    }

    hasDeclareKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.DeclareKeyword);
    }

    hasStaticKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.StaticKeyword);
    }

    isAmbient() {
        if (this.hasDeclareKeyword() || this.isInterface() || this.isTypeAlias()) {
            return true;
        }
        else {
            return this.isAnyParentAmbient();
        }
    }

    isClass() {
        return this.getKind() === ts.SyntaxKind.ClassDeclaration;
    }

    isConstructor() {
        return this.getKind() === ts.SyntaxKind.Constructor;
    }

    isConstructorParameter() {
        // this implementation will never be a constructor parameter
        return false;
    }

    isConstructSignature() {
        return this.getKind() === ts.SyntaxKind.ConstructSignature;
    }

    isDefaultKeyword() {
        return this.getKind() === ts.SyntaxKind.DefaultKeyword;
    }

    isEnum() {
        return this.getKind() === ts.SyntaxKind.EnumDeclaration;
    }

    isExportAssignment() {
        return this.getKind() === ts.SyntaxKind.ExportAssignment;
    }

    isExportDeclaration() {
        return this.getKind() === ts.SyntaxKind.ExportDeclaration;
    }

    isExportKeyword() {
        return this.getKind() === ts.SyntaxKind.ExportKeyword;
    }

    isFunction() {
        return this.getKind() === ts.SyntaxKind.FunctionDeclaration;
    }

    isFunctionType() {
        return this.getKind() === ts.SyntaxKind.FunctionType;
    }

    isGetAccessor() {
        return this.getKind() === ts.SyntaxKind.GetAccessor;
    }

    isIdentifier() {
        return this.getKind() === ts.SyntaxKind.Identifier;
    }

    isImport() {
        return this.getKind() === ts.SyntaxKind.ImportDeclaration;
    }

    isInterface() {
        return this.getKind() === ts.SyntaxKind.InterfaceDeclaration;
    }

    isMethodDeclaration() {
        return this.getKind() === ts.SyntaxKind.MethodDeclaration;
    }

    isMethodSignature() {
        return this.getKind() === ts.SyntaxKind.MethodSignature;
    }

    isNamespace() {
        return this.getKind() === ts.SyntaxKind.ModuleDeclaration;
    }

    isParameterOptional() {
        const parameterDeclaration = this.node as ts.ParameterDeclaration;
        return parameterDeclaration.questionToken != null || parameterDeclaration.initializer != null || parameterDeclaration.dotDotDotToken != null;
    }

    isPropertyOptional() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.questionToken != null;
    }

    isPropertyDeclaration() {
        return this.getKind() === ts.SyntaxKind.PropertyDeclaration;
    }

    isPropertySignature() {
        return this.getKind() === ts.SyntaxKind.PropertySignature;
    }

    isRestParameter() {
        const parameterDeclaration = this.node as ts.ParameterDeclaration;
        return parameterDeclaration.dotDotDotToken != null;
    }

    isSetAccessor() {
        return this.getKind() === ts.SyntaxKind.SetAccessor;
    }

    isStarImport() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        const namespaceImport = importDeclaration.importClause.namedBindings as ts.NamespaceImport;

        return namespaceImport != null && namespaceImport.name != null;
    }

    isTypeAlias() {
        return this.getKind() === ts.SyntaxKind.TypeAliasDeclaration;
    }

    isTypeParameter() {
        return this.getKind() === ts.SyntaxKind.TypeParameter;
    }

    isVariable() {
        return this.getKind() === ts.SyntaxKind.VariableDeclaration;
    }

    nodeKindToString() {
        return this.typeChecker.getSyntaxKindAsString(this.getKind());
    }

    private getTypeExpressionAtLocation(node: ts.Node): ITypeExpression {
        if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
            const declaration = node as ts.TypeAliasDeclaration;
            return this.getTypeExpressionAtLocation(declaration.type);
        }
        else {
            return this.getTypeExpressionFromType(this.typeChecker.getTypeAtLocation(node));
        }
    }

    private getTypeExpressionFromType(tsType: ts.Type) {
        return this.tsCache.getTypeExpression(this.typeChecker, this.sourceFile, tsType, () => this.createTypeExpression(tsType), type => this.createType(type));
    }

    private createType(type: ts.Type): IType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: type,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    private createTypeExpression(tsType: ts.Type): ITypeExpression {
        return new TsTypeExpression({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: tsType,
            tsCache: this.tsCache
        });
    }

    private createNode(node: ts.Node): INode {
        return this.tsCache.getNode(node, () => new TsNode({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            tsCache: this.tsCache,
            node: node
        }));
    }

    private createSymbol(symbol: ts.Symbol): ISymbol {
        if (symbol == null) {
            return null;
        }
        else {
            return this.tsCache.getSymbol(symbol, () => new TsSymbol({
                typeChecker: this.typeChecker,
                sourceFile: this.sourceFile,
                tsSourceFile: this.tsSourceFile,
                tsCache: this.tsCache,
                symbol: symbol
            }));
        }
    }

    private createTsExpression(expression: ts.Expression): IExpression {
        return new TsExpression({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsCache: this.tsCache,
            expression: expression
        });
    }

    private forEachChildNode(callback: (node: INode) => void) {
        ts.forEachChild(this.node, (node) => {
            if (this.isNotDisallowedNode(node)) {
                const declarationList = (node as ts.VariableStatement).declarationList;

                if (declarationList != null) {
                    node = declarationList.declarations[0];

                    if (declarationList.declarations.length > 1) {
                        Logger.warn(`Unknown situation where declaration list was greater than 1 for ${node.getText(this.sourceFile)}`);
                    }
                }

                callback(this.createNode(node));
            }
        });
    }

    private forEachLocalSymbol(callback: (node: INode) => void) {
        this.typeChecker.getLocalSymbolsFromNode(this.node).forEach(symbol => {
            (symbol.getDeclarations() || []).forEach(node => {
                callback(this.createNode(node));
            });
        });
    }

    private isNotDisallowedNode(node: ts.Node) {
        return node.kind !== ts.SyntaxKind.EndOfFileToken;
    }

    private isAnyParentAmbient() {
        let declaration = this.node.parent;

        while (declaration != null) {
            if (declaration.flags & ts.NodeFlags.Ambient) {
                return true;
            }

            declaration = declaration.parent;
        }

        return false;
    }

    private getArgumentsFromExpression(expression: ts.LeftHandSideExpression) {
        let args: IExpression[] = [];

        if (TypeGuards.isCallExpression(expression)) {
            for (let arg of expression.arguments) {
                args.push(this.createTsExpression(arg));
            }
        }

        return args;
    }

    private getNameFromExpression(expression: ts.LeftHandSideExpression): string {
        if (TypeGuards.isLiteralExpression(expression)) {
            return expression.text;
        }
        else if (expression != null) {
            return this.getNameFromExpression((expression as any)["expression"] as ts.LiteralExpression);
        }
        else {
            Logger.warn("The expression was null");
        }
    }

    private getKind() {
        return (this.node == null) ? ts.SyntaxKind.Unknown : this.node.kind;
    }

    private hasModifierWithSyntaxKind(syntaxKind: ts.SyntaxKind) {
        const node = (this.isVariable()) ? this.node.parent.parent : this.node;
        return (node.modifiers || []).some(m => m.kind === syntaxKind);
    }
}
