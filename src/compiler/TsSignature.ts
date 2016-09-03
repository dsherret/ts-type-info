import * as ts from "typescript";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";
import {TsType} from "./TsType";
import {TsNode} from "./TsNode";
import {TsSymbol} from "./TsSymbol";

interface TsSignatureOptions extends TsSourceFileChildOptions {
    signature: ts.Signature;
}

export class TsSignature extends TsSourceFileChild {
    private readonly signature: ts.Signature;

    constructor(opts: TsSignatureOptions) {
        super(opts);
        this.signature = opts.signature;
    }

    getDeclaration() {
        return this.createNode(this.signature.declaration);
    }

    getReturnType() {
        const tsType = this.typeChecker.getReturnTypeOfSignature(this.signature);
        return this.getTypeFromType(tsType);
    }

    getParameters() {
        const parameters = this.signature.parameters;
        return parameters.filter(p => p != null).map(parameter => this.createSymbol(parameter));
    }

    getTypeParameters() {
        let typeParameters = this.signature.typeParameters;
        return (typeParameters || []).map(typeParameter => this.createSymbol(typeParameter.symbol!));
    }

    private getTypeFromType(tsType: ts.Type) {
        return this.tsCache.getType(this.typeChecker, this.sourceFile, tsType, () => this.createType(tsType));
    }

    private createType(type: ts.Type): TsType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    private createNode(node: ts.Node) {
        return this.tsCache.getNode(node, () => new TsNode({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            node,
            tsSourceFile: this.tsSourceFile
        }));
    }

    private createSymbol(symbol: ts.Symbol) {
        return new TsSymbol({
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            symbol
        });
    }
}
