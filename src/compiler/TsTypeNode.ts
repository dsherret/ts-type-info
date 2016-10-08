import * as ts from "typescript";
import {Memoize} from "./../utils/decorators";
import {TsSymbol} from "./TsSymbol";
import {TsType} from "./TsType";
import {TsNode} from "./TsNode";
import {TsSourceFileChildOptions, TsSourceFileChild} from "./TsSourceFileChild";

// TODO: Evaluate this file and TsNode and separate out the common parts into a base class (watch out for circular references)

export interface TsTypeNodeOptions extends TsSourceFileChildOptions {
    node: ts.TypeNode;
}

export class TsTypeNode extends TsSourceFileChild {
    private readonly node: ts.TypeNode;

    @Memoize
    private get tsSymbol() {
        return this.originalSymbol || this.createSymbol(this.typeChecker.getSymbolAtLocation(this.node));
    }

    constructor(opts: TsTypeNodeOptions, private readonly originalSymbol?: TsSymbol | null) {
        super(opts);

        if (opts.node == null) {
            throw new Error(`Passed in ${nameof(opts)}.${nameof(opts.node)} cannot be null.`);
        }

        this.node = opts.node;
    }

    isIntersectionType() {
        return this.node.kind === ts.SyntaxKind.IntersectionType;
    }

    isUnionType() {
        return this.node.kind === ts.SyntaxKind.UnionType;
    }

    isArrayTypeNode() {
        return this.getArrayElementTypeNode() != null;
    }

    getArrayElementTypeNode() {
        const arrayTypeNode = this.node as ts.ArrayTypeNode;
        const typeReferenceNode = this.node as ts.TypeReferenceNode;

        if (arrayTypeNode.elementType != null) {
            return this.createTypeNode(arrayTypeNode.elementType);
        }

        if (/^Array\<.*\>$/.test(typeReferenceNode.getText()) && typeReferenceNode.typeArguments != null && typeReferenceNode.typeArguments.length === 1) {
            return this.createTypeNode(typeReferenceNode.typeArguments[0]);
        }

        return null;
    }

    getNode() {
        return this.createNode(this.node);
    }

    getTypeArgumentsTypeNodes() {
        const typeReferenceNode = this.node as ts.TypeReferenceNode;
        const typeArgs = typeReferenceNode.typeArguments || [] as ts.TypeNode[];

        return typeArgs.map(a => this.createTypeNode(a));
    }

    getTypeParameterNodes() {
        const typeReferenceNode = this.node as any as ts.SignatureDeclaration;
        const typeArgs = typeReferenceNode.typeParameters || [] as ts.TypeParameterDeclaration[];

        return typeArgs.map(a => this.createNode(a));
    }

    getText() {
        return this.node.getText();
    }

    getType(): TsType {
        return this.getTypeAtLocationByNode(this.node);
    }

    getMemberNodes() {
        const typeLiteralNode = this.node as ts.TypeLiteralNode;
        const members = typeLiteralNode.members || [] as ts.TypeElement[];

        return members.map(m => this.createNode(m));
    }

    getParameters() {
        const typeReferenceNode = this.node as any as ts.SignatureDeclaration;
        const params = typeReferenceNode.parameters || [] as ts.ParameterDeclaration[];

        return params.map(p => this.createNode(p));
    }

    getUnionOrIntersectionTypeNodes() {
        const unionOrIntersectionTypeNode = this.node as ts.UnionOrIntersectionTypeNode;
        const types = unionOrIntersectionTypeNode.types || [] as ts.TypeNode[];

        return types.map(t => this.createTypeNode(t));
    }

    private getTypeAtLocationByNode(node: ts.Node): TsType {
        if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
            const declaration = node as ts.TypeAliasDeclaration;
            return this.getTypeAtLocationByNode(declaration.type);
        }
        else {
            return this.getTsTypeFromNode(node);
        }
    }

    private getTsTypeFromNode(node: ts.Node) {
        const type = this.typeChecker.getTypeAtLocation(node);
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

    private createTypeNode(node: ts.TypeNode): TsTypeNode {
        return this.tsCache.getTypeNode(node, () => new TsTypeNode({
            typeChecker: this.typeChecker,
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            tsCache: this.tsCache,
            node
        }));
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
}
