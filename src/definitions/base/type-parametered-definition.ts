import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {TypeParameterDefinition} from "./../general";

export interface ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[];
    fillTypeParametersBySymbol(symbolNode: WrappedSymbolNode): void;
    fillTypeParametersBySignature(signature: WrappedSignature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[];

    fillTypeParametersBySymbol(symbolNode: WrappedSymbolNode) {
        this.typeParameters = symbolNode.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(typeParameterSymbol, this));
    }

    fillTypeParametersBySignature(signature: WrappedSignature) {
        this.typeParameters = signature.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(typeParameterSymbol, this));
    }
}
