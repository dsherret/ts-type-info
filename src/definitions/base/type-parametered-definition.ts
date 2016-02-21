import {ISignature, ISymbolNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {TypeParameterDefinition} from "./../general";

export interface ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode): void;
    fillTypeParametersBySignature(definitionFactory: IDefinitionFactory, signature: ISignature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;

    fillTypeParametersBySymbol(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) {
        const typeParameters = symbolNode.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(definitionFactory, typeParameterSymbol, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }

    fillTypeParametersBySignature(definitionFactory: IDefinitionFactory, signature: ISignature) {
        const typeParameters = signature.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(definitionFactory, typeParameterSymbol, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }
}
