import {ISignature, ISymbolNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {TypeParameterDefinition} from "./../general";

export interface ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol(mainFactory: MainFactory, symbolNode: ISymbolNode): void;
    fillTypeParametersBySignature(mainFactory: MainFactory, signature: ISignature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;

    fillTypeParametersBySymbol(mainFactory: MainFactory, symbolNode: ISymbolNode) {
        const typeParameters = symbolNode.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(mainFactory, typeParameterSymbol, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }

    fillTypeParametersBySignature(mainFactory: MainFactory, signature: ISignature) {
        const typeParameters = signature.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(mainFactory, typeParameterSymbol, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }
}
