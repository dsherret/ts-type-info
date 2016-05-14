import * as ts from "typescript";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";
import {TsTypeExpression} from "./TsTypeExpression";
import {TsType} from "./TsType";
import {TsNode} from "./TsNode";
import {TsSymbol} from "./TsSymbol";

interface TsSignatureOptions extends TsSourceFileChildOptions {
    signature: ts.Signature;
}

export class TsSignature extends TsSourceFileChild {
    private signature: ts.Signature;

    constructor(opts: TsSignatureOptions) {
        super(opts);
        this.signature = opts.signature;
    }

    getDeclaration() {
        return this.createNode(this.signature.declaration);
    }

    getReturnTypeExpression() {
        const tsType = this.typeChecker.getReturnTypeOfSignature(this.signature);

        return this.getTypeExpressionFromType(tsType);
    }

    getParameters() {
        const parameters = this.signature.parameters;
        return parameters.filter(p => p != null).map(parameter => this.createSymbol(parameter));
    }

    getTypeParameters() {
        type typeParameteredTypes = ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.FunctionDeclaration;
        let typeParameters = this.signature.typeParameters;

        return (typeParameters || []).map(typeParameter => this.createSymbol(typeParameter.symbol));
    }

    private getTypeExpressionFromType(tsType: ts.Type) {
        return this.tsCache.getTypeExpression(this.typeChecker, this.sourceFile, tsType, () => this.createTypeExpression(tsType), type => this.createType(type));
    }

    private createType(type: ts.Type): TsType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: type,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    private createNode(node: ts.Node) {
        return this.tsCache.getNode(node, () => new TsNode({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            node: node,
            tsSourceFile: this.tsSourceFile
        }));
    }

    private createTypeExpression(tsType: ts.Type) {
        return new TsTypeExpression({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: tsType,
            tsCache: this.tsCache
        });
    }

    private createSymbol(symbol: ts.Symbol) {
        return new TsSymbol({
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            symbol: symbol
        });
    }
}
