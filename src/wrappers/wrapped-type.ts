import * as ts from "typescript";
import {tryGet} from "./../utils";
import {BaseWrappedType, BaseWrappedTypeOptions} from "./base-wrapped-type";
import {WrappedSymbolNode} from "./wrapped-symbol-node";
import {WrappedSignature} from "./wrapped-signature";

export interface WrappedTypeOptions extends BaseWrappedTypeOptions {
    tsType: ts.Type;
}

export class WrappedType extends BaseWrappedType {
    protected tsType: ts.Type;

    constructor(opts: WrappedTypeOptions) {
        super(opts);

        this.tsType = opts.tsType;
    }

    getText() {
        return this.typeChecker.typeToString(this.tsType);
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
            return this.createSignatureFromOptions({
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

    protected createType(tsType: ts.Type) {
        return new WrappedType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsType: tsType
        });
    }

    protected createSymbolNodeFromSymbol(symbol: ts.Symbol) {
        return this.createSymbolNodeFromOptions({
            node: this.typeChecker.getDeclarationFromSymbol(symbol),
            parentNode: null,
            symbol: symbol
        });
    }

    protected createSymbolNodeFromOptions(opts: { node: ts.Node; parentNode: ts.Node; symbol: ts.Symbol; }) {
        return new WrappedSymbolNode({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            parentNode: opts.parentNode,
            node: opts.node,
            symbol: opts.symbol
        });
    }

    protected createSignatureFromOptions(opts: { signature: ts.Signature }) {
        return new WrappedSignature({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            signature: opts.signature
        });
    }
}
