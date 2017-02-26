import * as ts from "typescript";
import {Memoize} from "./../utils/decorators";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";
import {TsType} from "./TsType";
import {TsNode} from "./TsNode";
import {TsSymbol} from "./TsSymbol";

interface TsSignatureOptions extends TsSourceFileChildOptions {
    signature: ts.Signature;
    node: ts.Node | null;
}

export class TsSignature extends TsSourceFileChild {
    private readonly signature: ts.Signature;
    private readonly node: ts.Node | null;

    constructor(opts: TsSignatureOptions) {
        super(opts);
        this.signature = opts.signature;
        this.node = opts.node;
    }

    @Memoize
    getDeclaration() {
        return this.createNode(this.signature.declaration);
    }

    @Memoize
    getReturnType() {
        const tsType = this.typeChecker.getReturnTypeOfSignature(this.signature);
        return this.getTypeFromType(tsType);
    }

    @Memoize
    getParameters() {
        const parameters = this.signature.parameters;
        return parameters.filter(p => p != null).map(parameter => this.createSymbol(parameter));
    }

    @Memoize
    getTypeParameters() {
        const typeParameters = this.signature.typeParameters;
        return (typeParameters || []).map(typeParameter => this.createSymbol(typeParameter.symbol!));
    }

    @Memoize
    hasUserDefinedTypeGuard() {
        return this.getUserDefinedTypeGuard() != null;
    }

    @Memoize
    getUserDefinedTypeGuard() {
        const typePredicate = (this.signature as any).typePredicate as { parameterName: "str", type: ts.Type };
        return typePredicate == null ? null : {
            parameterName: typePredicate.parameterName,
            type: this.createType(typePredicate.type)
        };
    }

    private getTypeFromType(tsType: ts.Type) {
        return this.createType(tsType);
    }

    private createType(type: ts.Type): TsType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type,
            node: this.node,
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
