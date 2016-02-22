import * as ts from "typescript";
import {ISymbolNode} from "./../symbol-node";
import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";
import {TsSourceFileChildBase, TsSourceFileChildBaseOptions} from "./ts-source-file-child";
import {TsSymbolNode} from "./ts-symbol-node";
import {TsTypeExpression} from "./ts-type-expression";
import {TsType} from "./ts-type";

interface TsSignatureOptions extends TsSourceFileChildBaseOptions {
    signature: ts.Signature;
}

export class TsSignature extends TsSourceFileChildBase {
    private signature: ts.Signature;

    constructor(opts: TsSignatureOptions) {
        super(opts);
        this.signature = opts.signature;
    }

    getReturnTypeExpression() {
        const tsType = this.typeChecker.getReturnTypeOfSignature(this.signature);

        return this.getTypeExpressionFromType(tsType);
    }

    getParameters() {
        const parameters = this.signature.parameters;

        return parameters.filter(p => p != null).map(parameter => {
            return this.createTsSymbolNode({
                symbol: parameter,
                node: parameter.valueDeclaration,
                parentNode: null
            });
        });
    }

    getTypeParameters() {
        type typeParameteredTypes = ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.FunctionDeclaration;
        let typeParameters = this.signature.typeParameters;

        return (typeParameters || []).map(typeParameter => {
            const symbolNode = this.createTsSymbolNode({
                symbol: typeParameter.symbol,
                node: this.typeChecker.getDeclarationFromSymbol(typeParameter.symbol),
                parentNode: null
            });

            return symbolNode;
        });
    }

    getMinArgumentCount(): number {
        return (this.signature as any)["minArgumentCount"];
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

    protected createTsSymbolNode(opts: { node: ts.Node; parentNode: ts.Node; symbol: ts.Symbol; }): ISymbolNode {
        return new TsSymbolNode({
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            parentNode: opts.parentNode,
            node: opts.node,
            symbol: opts.symbol
        });
    }
}
