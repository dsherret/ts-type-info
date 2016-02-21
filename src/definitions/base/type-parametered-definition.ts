import {ISignature, ISymbolNode} from "./../../wrappers";
import {ArrayExt, MainCache} from "./../../utils";
import {TypeParameterDefinition} from "./../general";

export interface ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol(mainCache: MainCache, symbolNode: ISymbolNode): void;
    fillTypeParametersBySignature(mainCache: MainCache, signature: ISignature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;

    fillTypeParametersBySymbol(mainCache: MainCache, symbolNode: ISymbolNode) {
        const typeParameters = symbolNode.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(mainCache, typeParameterSymbol, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }

    fillTypeParametersBySignature(mainCache: MainCache, signature: ISignature) {
        const typeParameters = signature.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(mainCache, typeParameterSymbol, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }
}
