import * as ts from "typescript";
import {Scope} from "./../definitions/class/scope";
import {VariableDeclarationType} from "./../definitions/variable/variable-declaration-type";
import {NamespaceDeclarationType} from "./../definitions/namespace/namespace-declaration-type";
import {tryGet, Logger} from "./../utils";
import {WrappedNode, WrappedNodeOptions} from "./wrapped-node";

interface WrappedSymbolNodeOptions extends WrappedNodeOptions {
    symbol: ts.Symbol;
}

export class WrappedSymbolNode extends WrappedNode {
    protected symbol: ts.Symbol;

    constructor(opts: WrappedSymbolNodeOptions) {
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

    getFileName() {
        return (this.node as ts.SourceFile).fileName;
    }

    isExported() {
        return this.typeChecker.isSymbolExportOfParent(this.symbol);
    }

    isDefaultExport() {
        return this.typeChecker.isSymbolDefaultExportOfFile(this.symbol, this.sourceFile);
    }

    isNamedExport() {
        return this.typeChecker.isSymbolNamedExportOfFile(this.symbol, this.sourceFile);
    }

    getTypeExpression() {
        return tryGet(this, () => this.typeChecker.getTypeExpressionOfSymbol(this.symbol));
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
        return constraint == null ? null : this.typeChecker.getTypeExpressionAtLocation((this.node as ts.TypeParameterDeclaration).constraint);
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

    getParameterIsOptional() {
        const parameterDeclaration = this.node as ts.ParameterDeclaration;
        return parameterDeclaration.questionToken != null || parameterDeclaration.initializer != null || parameterDeclaration.dotDotDotToken != null;
    }

    getParameterIsRestParameter() {
        const parameterDeclaration = this.node as ts.ParameterDeclaration;
        return parameterDeclaration.dotDotDotToken != null;
    }

    getPropertyIsOptional() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.questionToken != null;
    }

    getDecorators() {
        return (this.node.decorators || []).map(decorator => this.createNode(decorator));
    }

    getDefaultExpression() {
        const propertyDeclaration = this.node as ts.PropertyDeclaration;
        return propertyDeclaration.initializer != null ? this.createWrappedExpression(propertyDeclaration.initializer) : null;
    }

    getParameters() {
        const parameters = (this.node as ts.SignatureDeclaration).parameters;
        return parameters.filter(p => p != null).map(p => this.createSymbolNodeFromDeclaration(p));
    }

    getReturnTypeExpression() {
        return this.typeChecker.getReturnTypeFromDeclaration(this.node);
    }

    getExtendsTypeExpressions() {
        return this.typeChecker.getExtendsTypeExpressions(this.symbol);
    }

    getImplementsTypeExpressions() {
        return this.typeChecker.getImplementsTypeExpressions(this.symbol);
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

    isPropertyReadonly() {
        return this.isPropertyAccessor() && (this.symbol.flags & ts.SymbolFlags.SetAccessor) === 0;
    }

    isPropertyAccessor() {
        return (this.symbol.flags & ts.SymbolFlags.GetAccessor) !== 0;
    }

    getDeclarationType() {
        const nodeFlags = this.node.flags;

        if ((nodeFlags & ts.NodeFlags.Namespace) !== 0) {
            return NamespaceDeclarationType.Namespace;
        }
        else {
            return NamespaceDeclarationType.Module;
        }
    }

    getConstantValue() {
        return this.typeChecker.getConstantValue(this.node as ts.ElementAccessExpression);
    }

    forEachChild(callback: (symbolNode: WrappedSymbolNode) => void) {
        if (this.isNamespace()) {
            return this.forEachLocalSymbol(callback);
        }
        else {
            return this.forEachChildNode(callback);
        }
    }

    private forEachLocalSymbol(callback: (symbolNode: WrappedSymbolNode) => void) {
        this.typeChecker.getLocalSymbolsFromNode(this.node).forEach(symbol => {
            (symbol.getDeclarations() || []).forEach(declaration => {
                const symbolNode = this.createSymbolNode({ node: declaration, symbol: symbol });
                callback(symbolNode);
            });
        });
    }

    private forEachChildNode(callback: (symbolNode: WrappedSymbolNode) => void) {
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

    private createSymbolNodeFromDeclaration(declaration: ts.Declaration) {
        return this.createSymbolNode({ node: declaration, symbol: this.typeChecker.getSymbolAtLocation(declaration) });
    }

    private createSymbolNodeFromSymbol(symbol: ts.Symbol) {
        return this.createSymbolNode({ node: this.typeChecker.getDeclarationFromSymbol(symbol), symbol: symbol });
    }

    private createSymbolNode(opts: { node: ts.Node; symbol: ts.Symbol }): WrappedSymbolNode {
        return new WrappedSymbolNode({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            parentNode: this.node,
            node: opts.node,
            symbol: opts.symbol
        });
    }
}
