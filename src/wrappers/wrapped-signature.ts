import * as ts from "typescript";
import {WrappedSymbolNode} from "./wrapped-symbol-node";
import {BaseWrappedType, BaseWrappedTypeOptions} from "./base-wrapped-type";

interface WrappedSignatureOptions extends BaseWrappedTypeOptions {
    signature: ts.Signature;
}

export class WrappedSignature extends BaseWrappedType {
    private signature: ts.Signature;

    constructor(opts: WrappedSignatureOptions) {
        super(opts);
        this.signature = opts.signature;
    }

    getReturnTypeExpression() {
        return this.typeChecker.getReturnTypeFromSignature(this.signature);
    }

    getParameters() {
        const parameters = this.signature.parameters;

        return parameters.filter(p => p != null).map(parameter => {
            return this.createSymbolNodeFromOptions({
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
            const symbolNode = this.createSymbolNodeFromOptions({
                symbol: typeParameter.symbol,
                node: this.typeChecker.getDeclarationFromSymbol(typeParameter.symbol),
                parentNode: null
            });

            return symbolNode;
        });
    }

    getMinArgumentCount() {
        return (this.signature as any)["minArgumentCount"];
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
}
