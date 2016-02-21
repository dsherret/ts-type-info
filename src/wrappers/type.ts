import {ISymbolNode} from "./symbol-node";
import {ISignature} from "./signature";

export interface IType {
    getText(): string;
    hasCallSignaturesAndProperties(): boolean;
    getProperties(): ISymbolNode[];
    getCallSignatures(): ISignature[];
    getTypeArguments(): IType[];
    getSymbolNodes(): ISymbolNode[];
}
