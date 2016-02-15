import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {ExtendedArray} from "./../../utils";
import {TypeParameterDefinition} from "./../general";

export interface ITypeParameteredDefinition {
    typeParameters: ExtendedArray<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol(symbolNode: WrappedSymbolNode): void;
    fillTypeParametersBySignature(signature: WrappedSignature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: ExtendedArray<TypeParameterDefinition<this>>;

    fillTypeParametersBySymbol(symbolNode: WrappedSymbolNode) {
        const typeParameters = symbolNode.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(typeParameterSymbol, this));
        this.typeParameters = new ExtendedArray<TypeParameterDefinition<this>>(...typeParameters);
    }

    fillTypeParametersBySignature(signature: WrappedSignature) {
        const typeParameters = signature.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(typeParameterSymbol, this));
        this.typeParameters = new ExtendedArray<TypeParameterDefinition<this>>(...typeParameters);
    }
}
