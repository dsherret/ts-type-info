import * as ts from "typescript";
import {TypeGuards} from "./../utils/type-guards";
import {WrappedSignature} from "./wrapped-signature";
import {WrappedExpression} from "./wrapped-expression";
import {BaseWrappedTypeOptions, BaseWrappedType} from "./base-wrapped-type";

export interface WrappedNodeOptions extends BaseWrappedTypeOptions {
    node: ts.Node;
    parentNode: ts.Node;
}

export class WrappedNode extends BaseWrappedType {
    protected node: ts.Node;
    protected parentNode: ts.Node;

    private get kind() {
        return (this.node == null) ? ts.SyntaxKind.Unknown : this.node.kind;
    }

    constructor(opts: WrappedNodeOptions) {
        super(opts);

        this.node = opts.node;
        this.parentNode = opts.parentNode;
    }

    getNode() {
        return this.node;
    }

    getDecoratorName() {
        const decorator = this.node as ts.Decorator;
        return this.getNameFromExpression(decorator.expression);
    }

    getDecoratorArguments() {
        const decorator = this.node as ts.Decorator;
        return this.getArgumentsFromExpression(decorator.expression);
    }

    getSignatureFromThis() {
        return new WrappedSignature({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            signature: this.typeChecker.getSignatureFromDeclaration(this.node as ts.SignatureDeclaration)
        });
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

    isClass() {
        return this.kind === ts.SyntaxKind.ClassDeclaration;
    }

    isConstructor() {
        return this.kind === ts.SyntaxKind.Constructor;
    }

    isConstructSignature() {
        return this.kind === ts.SyntaxKind.ConstructSignature;
    }

    isEnum() {
        return this.kind === ts.SyntaxKind.EnumDeclaration;
    }

    isExportDeclaration() {
        return this.kind === ts.SyntaxKind.ExportDeclaration;
    }

    isExportAssignment() {
        return this.kind === ts.SyntaxKind.ExportAssignment;
    }

    isFunction() {
        return this.kind === ts.SyntaxKind.FunctionDeclaration;
    }

    isGetAccessor() {
        return this.kind === ts.SyntaxKind.GetAccessor;
    }

    isIdentifier() {
        return this.kind === ts.SyntaxKind.Identifier;
    }

    isInterface() {
        return this.kind === ts.SyntaxKind.InterfaceDeclaration;
    }

    isMethodDeclaration() {
        return this.kind === ts.SyntaxKind.MethodDeclaration;
    }

    isMethodSignature() {
        return this.kind === ts.SyntaxKind.MethodSignature;
    }

    isNamespace() {
        return this.kind === ts.SyntaxKind.ModuleDeclaration;
    }

    isPropertyDeclaration() {
        return this.kind === ts.SyntaxKind.PropertyDeclaration;
    }

    isPropertySignature() {
        return this.kind === ts.SyntaxKind.PropertySignature;
    }

    isSetAccessor() {
        return this.kind === ts.SyntaxKind.SetAccessor;
    }

    isTypeAlias() {
        return this.kind === ts.SyntaxKind.TypeAliasDeclaration;
    }

    isTypeParameter() {
        return this.kind === ts.SyntaxKind.TypeParameter;
    }

    isVariable() {
        return this.kind === ts.SyntaxKind.VariableDeclaration;
    }

    nodeKindToString() {
        return this.typeChecker.getSyntaxKindAsString(this.kind);
    }

    protected createNode(node: ts.Node) {
        return this.createNodeFromOptions({
            parentNode: this.node,
            node: node
        });
    }

    protected createNodeFromOptions(opts: { node: ts.Node; parentNode: ts.Node; }) {
        return new WrappedNode({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            parentNode: opts.parentNode,
            node: opts.node
        });
    }

    protected createWrappedExpression(expression: ts.Expression) {
        return new WrappedExpression({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            expression: expression
        });
    }

    private getArgumentsFromExpression(expression: ts.LeftHandSideExpression) {
        let args: WrappedExpression[] = [];

        if (TypeGuards.isCallExpression(expression)) {
            for (let arg of expression.arguments) {
                args.push(this.createWrappedExpression(arg));
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
            console.warn("The expression was null");
        }
    }

    private hasModifierWithSyntaxKind(syntaxKind: ts.SyntaxKind) {
        const node = (this.isVariable()) ? this.node.parent.parent : this.node;
        return (node.modifiers || []).some(m => m.kind === syntaxKind);
    }
}
