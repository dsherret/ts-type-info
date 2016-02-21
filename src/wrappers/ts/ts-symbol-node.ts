import * as ts from "typescript";
import {Scope} from "./../../definitions/class/scope";
import {ClassConstructorParameterScope} from "./../../definitions/class/class-constructor-parameter-scope";
import {VariableDeclarationType} from "./../../definitions/variable/variable-declaration-type";
import {NamespaceDeclarationType} from "./../../definitions/namespace/namespace-declaration-type";
import {tryGet, Logger} from "./../../utils";
import {ITypeExpression} from "./../type-expression";
import {ISymbolNode} from "./../symbol-node";
import {TsNode, TsNodeOptions} from "./ts-node";

interface TsSymbolNodeOptions extends TsNodeOptions {
    symbol: ts.Symbol;
}

export class TsSymbolNode extends TsNode implements ISymbolNode {
    protected symbol: ts.Symbol;

    constructor(opts: TsSymbolNodeOptions) {
        super(opts);

        this.symbol = opts.symbol;
    }

    getName() {
        let name = this.symbol.getName();

        if (name === "default") {
            const localSymbol = this.typeChecker.getLocalSymbolFromNode(this.node);
            name = localSymbol.getName();
        }

        return name;
    }

    isExported() {
        let parentSymbol = this.getSymbolParent(this.symbol);

        if (parentSymbol == null) {
            return this.isDefaultExport();
        }
        else {
            return parentSymbol != null && parentSymbol.exports != null && parentSymbol.exports[this.symbol.name] != null;
        }
    }

    isAlias() {
        return this.typeChecker.symbolHasFlag(this.symbol, ts.SymbolFlags.Alias);
    }

    isDefaultExport() {
        return this.typeChecker.isSymbolDefaultExportOfFile(this.symbol, this.sourceFile);
    }

    isNamedExport() {
        return this.typeChecker.isSymbolNamedExportOfFile(this.symbol, this.sourceFile);
    }

    isConstructorParameter() {
        // a ts symbol node will never be a constructor parameter
        return false;
    }

    getAllRelatedSymbolNodes() {
        return (this.symbol.getDeclarations() || []).map(declaration => this.createSymbolNode({
            node: declaration,
            symbol: this.symbol
        }));
    }

    getTypeExpression(): ITypeExpression {
        return tryGet(this, () => this.getTypeExpressionAtLocation(this.node));
    }

    getTypeParameters() {
        type typeParameteredTypes = ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.FunctionDeclaration;
        let typeParameteredDeclaration = this.node as typeParameteredTypes;
        let typeParameters = typeParameteredDeclaration.typeParameters;

        return (typeParameters || []).map(typeParameter => {
            return this.createSymbolNodeFromDeclaration(typeParameter);
        });
    }

    getTypeParameterConstraintTypeExpression() {
        const constraint = (this.node as ts.TypeParameterDeclaration).constraint;
        return constraint == null ? null : this.getTypeExpressionAtLocation((this.node as ts.TypeParameterDeclaration).constraint);
    }

    isAmbient() {
        if (this.hasDeclareKeyword() || this.isInterface() || this.isTypeAlias()) {
            return true;
        }
        else {
            return this.isAnyParentAmbient();
        }
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

    getEnumMembers() {
        return Object.keys(this.symbol.exports).map(memberName => {
            const memberSymbol = this.symbol.exports[memberName];
            return this.createSymbolNodeFromSymbol(memberSymbol);
        });
    }

    isParameterOptional() {
        const parameterDeclaration = this.node as ts.ParameterDeclaration;
        return parameterDeclaration.questionToken != null || parameterDeclaration.initializer != null || parameterDeclaration.dotDotDotToken != null;
    }

    isRestParameter() {
        const parameterDeclaration = this.node as ts.ParameterDeclaration;
        return parameterDeclaration.dotDotDotToken != null;
    }

    isPropertyOptional() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.questionToken != null;
    }

    getDecorators() {
        return (this.node.decorators || []).map(decorator => this.createNode(decorator));
    }

    getDefaultExpression() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.initializer != null ? this.createTsExpression(propertyDeclaration.initializer) : null;
    }

    getParameters() {
        const parameters = (this.node as ts.SignatureDeclaration).parameters;
        return parameters.filter(p => p != null).map(p => this.createSymbolNodeFromDeclaration(p));
    }

    getExtendsTypeExpressions() {
        const symbolType = this.typeChecker.getDeclaredTypeOfSymbol(this.symbol);
        return symbolType.getBaseTypes().map(t => this.getTypeExpressionFromType(t));
    }

    getImplementsTypeExpressions() {
        const valueDeclaration = this.node as ts.ClassLikeDeclaration;
        const symbolType = this.typeChecker.getDeclaredTypeOfSymbol(this.symbol);
        const implementsIndex = symbolType.getBaseTypes().length > 0 ? 1 : 0;

        if (valueDeclaration.heritageClauses != null && valueDeclaration.heritageClauses.length > implementsIndex) {
            const types = valueDeclaration.heritageClauses[implementsIndex].types;

            /* istanbul ignore else */
            if (types != null && types.length > 0) {
                return types.map(t => this.typeChecker.getTypeAtLocation(t))
                    .map(t => this.getTypeExpressionFromType(t));
            }
        }

        return [];
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

    getAliasSymbolNode() {
        return this.createSymbolNodeFromSymbol(this.typeChecker.getAliasedSymbol(this.symbol));
    }

    isPropertyReadonly() {
        return this.isPropertyAccessor() && (this.symbol.flags & ts.SymbolFlags.SetAccessor) === 0;
    }

    isPropertyAccessor() {
        return (this.symbol.flags & ts.SymbolFlags.GetAccessor) !== 0;
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

    forEachChild(callback: (symbolNode: ISymbolNode) => void) {
        if (this.isNamespace()) {
            this.forEachLocalSymbol(callback);
        }
        else {
            this.forEachChildNode(callback);
        }
    }

    protected createSymbolNodeFromDeclaration(declaration: ts.Declaration) {
        return this.createSymbolNode({ node: declaration, symbol: this.typeChecker.getSymbolAtLocation(declaration) });
    }

    protected createSymbolNodeFromSymbol(symbol: ts.Symbol) {
        return this.createSymbolNode({ node: this.typeChecker.getDeclarationFromSymbol(symbol), symbol: symbol });
    }

    protected createSymbolNode(opts: { symbol: ts.Symbol; node: ts.Node; }): ISymbolNode {
        return this.tsCache.getSymbolNode(opts.symbol, opts.node, () => new TsSymbolNode({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            parentNode: this.node,
            node: opts.node,
            symbol: opts.symbol,
            tsSourceFile: this.tsSourceFile
        }));
    }

    private forEachLocalSymbol(callback: (symbolNode: ISymbolNode) => void) {
        this.typeChecker.getLocalSymbolsFromNode(this.node).forEach(symbol => {
            (symbol.getDeclarations() || []).forEach(declaration => {
                const symbolNode = this.createSymbolNode({ node: declaration, symbol: symbol });
                callback(symbolNode);
            });
        });
    }

    private forEachChildNode(callback: (symbolNode: ISymbolNode) => void) {
        ts.forEachChild(this.node, (node) => {
            if (this.isNotDisallowedNode(node)) {
                let symbol: ts.Symbol;

                const declarationList = (node as ts.VariableStatement).declarationList;
                if (declarationList != null) {
                    node = declarationList.declarations[0];

                    if (declarationList.declarations.length > 1) {
                        Logger.warn(`Unknown situation where declaration list was greater than 1 for ${node.getText(this.sourceFile)}`);
                    }
                }

                symbol = this.typeChecker.getSymbolAtLocation(node);

                if (symbol != null) {
                    const symbolNode = this.createSymbolNode({ node: node, symbol: symbol });

                    callback(symbolNode);
                }
            }
        });
    }

    private isNotDisallowedNode(node: ts.Node) {
        return node.kind !== ts.SyntaxKind.EndOfFileToken;
    }

    private isAnyParentAmbient() {
        let declaration = this.parentNode;

        while (declaration != null) {
            if (declaration.flags & ts.NodeFlags.Ambient) {
                return true;
            }

            declaration = declaration.parent;
        }

        return false;
    }

    private getSymbolParent(symbol: ts.Symbol) {
        return symbol == null ? null : (symbol as any).parent as ts.Symbol;
    }
}
