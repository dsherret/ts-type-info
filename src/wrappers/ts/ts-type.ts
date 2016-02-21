import * as ts from "typescript";
import {tryGet} from "./../../utils";
import {IType} from "./../type";
import {ISymbolNode} from "./../symbol-node";
import {ISignature} from "./../signature";
import {TsSourceFileChildBase, TsSourceFileChildBaseOptions} from "./ts-source-file-child-base";
import {TsSymbolNode} from "./ts-symbol-node";
import {TsSignature} from "./ts-signature";

export interface TsTypeOptions extends TsSourceFileChildBaseOptions {
    tsType: ts.Type;
}

export class TsType extends TsSourceFileChildBase implements IType {
    protected tsType: ts.Type;

    constructor(opts: TsTypeOptions) {
        super(opts);

        this.tsType = opts.tsType;
    }

    getText() {
        return this.typeChecker.typeToString(this.sourceFile, this.tsType);
    }

    hasCallSignaturesAndProperties() {
        return (this.tsType.flags & (
            ts.TypeFlags.ObjectType |
            ts.TypeFlags.Instantiated
        )) !== 0 &&
        (this.tsType.flags & (
            ts.TypeFlags.Class |
            ts.TypeFlags.Interface
        )) === 0;
    }

    getProperties() {
        const properties = this.tsType.getProperties();

        return (properties || []).filter(p => p.name !== "prototype").map(property => {
            return this.createSymbolNodeFromSymbol(property);
        });
    }

    getCallSignatures() {
        const callSignatures = this.tsType.getCallSignatures();

        return (callSignatures || []).map(callSignature => {
            return this.createTsSignature({
                signature: callSignature
            });
        });
    }

    getTypeArguments() {
        const tsTypeArguments = (this.tsType as ts.TypeReference).typeArguments;

        return (tsTypeArguments || []).map(arg => {
            return tryGet(this.getText(), () => this.createType(arg));
        });
    }

    getSymbolNodes() {
        const typeArray = (this.tsType as ts.UnionOrIntersectionType).types;

        if (typeArray != null) {
            return typeArray.map(t => t.symbol).filter(s => s != null).map(s => this.createSymbolNodeFromSymbol(s));
        }
        else if (this.tsType.symbol != null) {
            return [this.createSymbolNodeFromSymbol(this.tsType.symbol)];
        }
        else {
            return [];
        }
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

    protected createSymbolNodeFromSymbol(symbol: ts.Symbol) {
        return this.createSymbolNode({
            node: this.typeChecker.getDeclarationFromSymbol(symbol),
            parentNode: null,
            symbol: symbol
        });
    }

    protected createSymbolNode(opts: { node: ts.Node; parentNode: ts.Node; symbol: ts.Symbol; }): ISymbolNode {
        return this.tsCache.getSymbolNode(opts.symbol, opts.node, () => {
            return new TsSymbolNode({
                sourceFile: this.sourceFile,
                typeChecker: this.typeChecker,
                tsCache: this.tsCache,
                parentNode: opts.parentNode,
                node: opts.node,
                symbol: opts.symbol,
                tsSourceFile: this.tsSourceFile
            });
        });
    }

    protected createTsSignature(opts: { signature: ts.Signature }): ISignature {
        return new TsSignature({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            signature: opts.signature,
            tsSourceFile: this.tsSourceFile
        });
    }
}
