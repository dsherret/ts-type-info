import * as ts from "typescript";
import {ArrayUtils} from "./../utils/ArrayUtils";
import {Memoize} from "./../utils/decorators";
import {Logger} from "./../utils/Logger";
import {TypeGuards} from "./../utils/TypeGuards";
import {ClassConstructorParameterScope, NamespaceDeclarationType, Scope, VariableDeclarationType} from "./../definitions";
import {NameKeyUtils} from "./utils";
import {TsExpression} from "./TsExpression";
import {TsSignature} from "./TsSignature";
import {TsSymbol} from "./TsSymbol";
import {TsType} from "./TsType";
import {TsTypeNode} from "./TsTypeNode";
import {TsSourceFileChildOptions, TsSourceFileChild} from "./TsSourceFileChild";

export interface TsNodeOptions extends TsSourceFileChildOptions {
    node: ts.Node;
}

export class TsNode extends TsSourceFileChild {
    protected readonly node: ts.Node;

    @Memoize
    private get tsSymbol() {
        return this.originalSymbol || this.createSymbol(this.typeChecker.getSymbolAtLocation(this.node));
    }

    constructor(opts: TsNodeOptions, private readonly originalSymbol?: TsSymbol | null) {
        super(opts);

        if (opts.node == null) {
            throw new Error(`Passed in ${nameof(opts)}.${nameof(opts.node)} cannot be null.`);
        }

        this.node = opts.node;
    }

    getName() {
        let name: string | undefined;
        const symbol = this.tsSymbol;

        if (symbol != null) {
            name = symbol.getName();

            if (name === "default") {
                const localSymbol = this.getLocalSymbol();
                if (localSymbol != null) {
                    name = localSymbol.getName();
                }
            }
        }

        return name || "";
    }

    getNameKey() {
        return NameKeyUtils.getNameKeyFromName(this.getName());
    }

    getUnderlyingNode() {
        return this.node;
    }

    getSymbol() {
        return this.tsSymbol;
    }

    getChildren() {
        const nodes: TsNode[] = [];

        this.forEachChild(node => nodes.push(node));

        return nodes;
    }

    forEachChild(callback: (node: TsNode) => void) {
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

    getIsDecoratorFactory() {
        const decorator = this.node as ts.Decorator;
        return TypeGuards.isCallExpression(decorator.expression);
    }

    getDecorators() {
        return this.node.decorators ? this.node.decorators.map(d => this.createNode(d)) : [];
    }

    getDefaultExpression() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.initializer != null ? this.createTsExpression(propertyDeclaration.initializer) : null;
    }

    getDefaultImportNode() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        const clause = importDeclaration.importClause;

        if (clause != null && clause.name != null) {
            return this.createNode(clause.name);
        }
        else {
            return null;
        }
    }

    getExpression() {
        let expression: TsExpression | null = null;
        const expressionStatement = this.node as ts.ExpressionStatement;

        if (expressionStatement.expression != null) {
            expression = this.createTsExpression(expressionStatement.expression);
        }

        return expression;
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
        let fileName: string | null = null;

        if (importDeclaration.moduleSpecifier != null) {
            const moduleSymbol = this.typeChecker.getSymbolAtLocation(importDeclaration.moduleSpecifier);

            if (moduleSymbol != null) {
                const sourceFile = this.typeChecker.getDeclarationFromSymbol(moduleSymbol).getSourceFile();
                fileName = sourceFile.fileName;
            }
        }

        return fileName;
    }

    getModuleSpecifierSymbol() {
       const importDeclaration = this.node as ts.ImportDeclaration;
       return this.createSymbol(this.typeChecker.getSymbolAtLocation(importDeclaration.moduleSpecifier));
    }

    getImportNamedImportNodes() {
        const importDeclaration = this.node as ts.ImportDeclaration;
        const importClause = (importDeclaration.importClause || {}) as ts.ImportClause;
        const namedBindings = (importClause.namedBindings || {}) as ts.NamedImports;
        return (namedBindings.elements || []).map(e => this.createNode(e));
    }

    getReExportNamedExportNodes() {
        const exportDeclaration = this.node as ts.ExportDeclaration;
        const exportClause = exportDeclaration.exportClause || {} as ts.NamedImports;
        return (exportClause.elements || []).map(e => this.createNode(e));
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

    getParameterObjectBindingPatternElements() {
        const name = (this.node as ts.ParameterDeclaration).name as ts.ObjectBindingPattern;
        return (name.elements || []).map(e => this.createNode(e));
    }

    getUserDefinedTypeGuardParameterName() {
        const typePredicateNode = (this.node as ts.TypePredicateNode);
        return (typePredicateNode.parameterName as ts.Identifier).text;
    }

    getUserDefinedTypeGuardTypeNode() {
        const typeNode = (this.node as ts.TypePredicateNode).type;
        return typeNode == null ? null : this.createTypeNode(typeNode);
    }

    getParameters() {
        const parameters = (this.node as ts.SignatureDeclaration).parameters;
        return parameters.filter(p => p != null).map(p => this.createNode(p));
    }

    getReturnType() {
        return this.getOrCreateType(this.typeChecker.getReturnTypeOfNode(this.node), this.node);
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

    getSignatureFromThis(): TsSignature {
        return new TsSignature({
            typeChecker: this.typeChecker,
            tsSourceFile: this.tsSourceFile,
            sourceFile: this.sourceFile,
            tsCache: this.tsCache,
            signature: this.typeChecker.getSignatureFromNode(this.node),
            node: this.node
        });
    }

    getStarImportName() {
        return this.getStarImportNode()!.getText();
    }

    @Memoize
    getStarImportNode() {
        const importDeclaration = this.node as ts.ImportDeclaration;

        if (importDeclaration.importClause != null && importDeclaration.importClause.namedBindings != null) {
            const namespaceImport = importDeclaration.importClause.namedBindings as ts.NamespaceImport;
            if (namespaceImport.name != null)
                return this.createNode(namespaceImport.name);
        }

        return null;
    }

    getTypeParameters() {
        type typeParameteredTypes = ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.FunctionDeclaration;
        let typeParameteredDeclaration = this.node as typeParameteredTypes;

        return typeParameteredDeclaration.typeParameters ? typeParameteredDeclaration.typeParameters.map(typeParameter => this.createNode(typeParameter)) : [];
    }

    getTypeParameterConstraintTypeNode() {
        const constraint = (this.node as ts.TypeParameterDeclaration).constraint;
        return constraint == null ? null : this.createTypeNode(constraint);
    }

    getHeritageTypeNodes() {
        const clause = this.node as ts.HeritageClause;
        return clause.types ? clause.types.map(expressionWithTypeArgumentsTypeNode => this.createTypeNode(expressionWithTypeArgumentsTypeNode)) : [];
    }

    getParent() {
        return this.node.parent == null ? null : this.createNode(this.node.parent);
    }

    getType(): TsType {
        return this.getTypeAtLocationByNode(this.node);
    }

    getTypeNode() {
        const typeNode = (this.node as any)["type"] as ts.TypeNode | null;
        return typeNode == null ? null : this.createTypeNode(typeNode);
    }

    getText() {
        return this.node.getText();
    }

    getJsDocText() {
        const node = (this.isVariable()) ? this.node.parent! : this.node;

        // node full start usually differs by 1 if there's no comment
        if (node.getFullStart() + 1 >= node.getStart())
            return "";

        try {
            const fullText = node.getFullText();
            const ranges = ts.getLeadingCommentRanges(fullText, 0);

            for (const range of ranges) {
                if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                    const text = fullText.substring(range.pos, range.end);
                    if (text.indexOf("/**") === 0)
                        return text;
                }
            }
        } catch (ex) {
            Logger.log(ex);
        }

        return "";
    }

    getVariableDeclarationType() {
        const nodeFlags = this.node.parent!.flags;

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

    hasAsyncKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.AsyncKeyword);
    }

    hasConstKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.ConstKeyword);
    }

    hasDeclareKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.DeclareKeyword);
    }

    hasExtendsKeyword() {
        return (this.node as ts.HeritageClause).token === ts.SyntaxKind.ExtendsKeyword;
    }

    hasFunctionBody() {
        return (this.node as any).body != null;
    }

    hasImplementsKeyword() {
        return (this.node as ts.HeritageClause).token === ts.SyntaxKind.ImplementsKeyword;
    }

    hasReadonlyKeyword() {
        return this.hasModifierWithSyntaxKind(ts.SyntaxKind.ReadonlyKeyword);
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

    isCallSignature() {
        return this.getKind() === ts.SyntaxKind.CallSignature;
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

    isGeneratorFunction() {
        return (this.node as ts.FunctionLikeDeclaration).asteriskToken != null;
    }

    isGetAccessor() {
        return this.getKind() === ts.SyntaxKind.GetAccessor;
    }

    isSetAccessor() {
        return this.getKind() === ts.SyntaxKind.SetAccessor;
    }

    isHeritageClause() {
        return this.getKind() === ts.SyntaxKind.HeritageClause;
    }

    isIdentifier() {
        return this.getKind() === ts.SyntaxKind.Identifier;
    }

    isImport() {
        return this.getKind() === ts.SyntaxKind.ImportDeclaration;
    }

    isIndexSignature() {
        return this.getKind() === ts.SyntaxKind.IndexSignature;
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

    isPropertyOptional(): boolean {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;

        if (this.node.parent != null && this.node.parent.parent != null && this.node.parent.parent.kind === ts.SyntaxKind.Parameter) {
            // for parameter destructuring
            const name = this.getName();
            const prop = ArrayUtils.firstOrDefault(this.createNode(this.node.parent.parent).getType().getProperties(), p => p.getName() === name);

            if (prop != null) {
                const nodes = prop.getNodes();
                if (nodes.length === 1)
                    return (nodes[0].node as ts.PropertyDeclaration).questionToken != null;
                return prop.isPropertyOptional();
            }

            return false;
        }
        else {
            return propertyDeclaration.questionToken != null;
        }
    }

    isPropertyReadonly(): boolean {
        if (this.node.parent != null && this.node.parent.parent != null && this.node.parent.parent.kind === ts.SyntaxKind.Parameter) {
            // for parameter destructuring
            const name = this.getName();
            const propSymbol = ArrayUtils.firstOrDefault(this.createNode(this.node.parent.parent).getType().getProperties(), p => p.getName() === name);

            if (propSymbol != null) {
                const nodes = propSymbol.getNodes();
                if (nodes.length === 1)
                    return nodes[0].hasReadonlyKeyword();
                return propSymbol.isPropertyReadonly();
            }

            return false;
        }
        else {
            return this.hasReadonlyKeyword();
        }
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

    isStarImport() {
        return this.getStarImportNode() != null;
    }

    isTypeLiteral() {
        return this.getKind() === ts.SyntaxKind.TypeLiteral;
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

    isUserDefinedTypeGuard() {
        return this.getKind() === ts.SyntaxKind.TypePredicate;
    }

    nodeKindToString() {
        return this.typeChecker.getSyntaxKindAsString(this.getKind());
    }

    getNamedImportName() {
        const name = (this.node as ts.ImportOrExportSpecifier).name;
        return name != null ? name.text : null;
    }

    getNamedImportPropertyName() {
        const propertyName = (this.node as ts.ImportOrExportSpecifier).propertyName;
        return propertyName != null ? propertyName.text : null;
    }

    private getTypeAtLocationByNode(node: ts.Node): TsType {
        return this.getOrCreateType(this.typeChecker.getTypeAtLocation(node), node);
    }

    private getOrCreateType(type: ts.Type, node: ts.Node) {
        return this.tsCache.getType(this.typeChecker, type, node, () => this.createType(type, node));
    }

    private createType(type: ts.Type, node: ts.Node): TsType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type,
            node,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    private createNode(node: ts.Node): TsNode {
        return this.tsCache.getNode(node, () => new TsNode({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            tsCache: this.tsCache,
            node
        }));
    }

    private createTypeNode(node: ts.TypeNode): TsTypeNode {
        return this.tsCache.getTypeNode(node, () => new TsTypeNode({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            tsCache: this.tsCache,
            node
        }));
    }

    private createSymbol(symbol: ts.Symbol | null): TsSymbol | null {
        if (symbol == null) {
            return null;
        }
        else {
            return this.tsCache.getSymbol(symbol, () => new TsSymbol({
                typeChecker: this.typeChecker,
                sourceFile: this.sourceFile,
                tsSourceFile: this.tsSourceFile,
                tsCache: this.tsCache,
                symbol: symbol!
            }));
        }
    }

    private createTsExpression(expression: ts.Expression): TsExpression {
        return new TsExpression({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsCache: this.tsCache,
            expression
        });
    }

    private forEachChildNode(callback: (node: TsNode) => void) {
        ts.forEachChild(this.node, node => {
            if (this.isNotDisallowedNode(node)) {
                if (node.kind === ts.SyntaxKind.VariableStatement) {
                    const declarationList = (node as ts.VariableStatement).declarationList;
                    node = declarationList.declarations[0];

                    if (declarationList.declarations.length > 1) {
                        Logger.warn(`Unknown situation where declaration list was greater than 1 for ${node.getText(this.sourceFile)}`);
                    }
                }

                callback(this.createNode(node));
            }
        });
    }

    private forEachLocalSymbol(callback: (node: TsNode) => void) {
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
        let args: TsExpression[] = [];

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
            return "";
        }
    }

    private getKind() {
        return this.node.kind;
    }

    private hasModifierWithSyntaxKind(syntaxKind: ts.SyntaxKind) {
        const node = (this.isVariable()) ? this.node.parent!.parent! : this.node;
        return node.modifiers ? node.modifiers.some(m => m.kind === syntaxKind) : false;
    }
}
