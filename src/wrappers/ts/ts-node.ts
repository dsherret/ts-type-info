import * as ts from "typescript";
import {TypeGuards} from "./../../utils/type-guards";
import {Logger} from "./../../utils/logger";
import {INode} from "./../node";
import {ISignature} from "./../signature";
import {IExpression} from "./../expression";
import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";
import {TsSignature} from "./ts-signature";
import {TsExpression} from "./ts-expression";
import {TsType} from "./ts-type";
import {TsTypeExpression} from "./ts-type-expression";
import {TsSourceFileChildBaseOptions, TsSourceFileChildBase} from "./ts-source-file-child";

export interface TsNodeOptions extends TsSourceFileChildBaseOptions {
    node: ts.Node;
    parentNode: ts.Node;
}

export class TsNode extends TsSourceFileChildBase implements INode {
    protected node: ts.Node;
    protected parentNode: ts.Node;

    constructor(opts: TsNodeOptions) {
        super(opts);

        this.node = opts.node;
        this.parentNode = opts.parentNode;
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

    getExpression() {
        let expression: IExpression;
        const expressionStatement = this. node as ts.ExpressionStatement;

        if (expressionStatement.expression != null) {
            expression = this.createTsExpression(expressionStatement.expression);
        }

        return expression;
    }

    getReturnTypeExpression() {
        const tsType = this.typeChecker.getReturnTypeOfNode(this.node);

        return this.getTypeExpressionFromType(tsType);
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
        return this.getKind() === ts.SyntaxKind.ClassDeclaration;
    }

    isConstructor() {
        return this.getKind() === ts.SyntaxKind.Constructor;
    }

    isConstructSignature() {
        return this.getKind() === ts.SyntaxKind.ConstructSignature;
    }

    isEnum() {
        return this.getKind() === ts.SyntaxKind.EnumDeclaration;
    }

    isExportDeclaration() {
        return this.getKind() === ts.SyntaxKind.ExportDeclaration;
    }

    isExportAssignment() {
        return this.getKind() === ts.SyntaxKind.ExportAssignment;
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

    isPropertyDeclaration() {
        return this.getKind() === ts.SyntaxKind.PropertyDeclaration;
    }

    isPropertySignature() {
        return this.getKind() === ts.SyntaxKind.PropertySignature;
    }

    isSetAccessor() {
        return this.getKind() === ts.SyntaxKind.SetAccessor;
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

    protected getTypeExpressionAtLocation(node: ts.Node): ITypeExpression {
        if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
            const declaration = node as ts.TypeAliasDeclaration;
            return this.getTypeExpressionAtLocation(declaration.type);
        }
        else {
            return this.getTypeExpressionFromType(this.typeChecker.getTypeAtLocation(node));
        }
    }

    protected getTypeExpressionFromType(tsType: ts.Type) {
        return this.tsCache.getTypeExpression(this.typeChecker, this.sourceFile, tsType, () => this.createTypeExpression(tsType), type => this.createType(type));
    }

    protected createType(tsType: ts.Type): IType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsType: tsType,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    protected createTypeExpression(tsType: ts.Type): ITypeExpression {
        return new TsTypeExpression({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsType: tsType,
            tsCache: this.tsCache
        });
    }

    protected createNode(node: ts.Node): INode {
        return this.createTsNode({
            parentNode: this.node,
            node: node
        });
    }

    protected createTsNode(opts: { node: ts.Node; parentNode: ts.Node; }): INode {
        return this.tsCache.getNodeOrCreate(opts.node, () => new TsNode({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            tsCache: this.tsCache,
            parentNode: opts.parentNode,
            node: opts.node
        }));
    }

    protected createTsExpression(expression: ts.Expression): IExpression {
        return new TsExpression({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsCache: this.tsCache,
            expression: expression
        });
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
