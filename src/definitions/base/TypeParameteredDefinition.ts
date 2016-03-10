import {ISignature, INode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {TypeParameterDefinition} from "./../general";

export interface ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol(mainFactory: MainFactory, node: INode): void;
    fillTypeParametersBySignature(mainFactory: MainFactory, signature: ISignature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;

    fillTypeParametersBySymbol(mainFactory: MainFactory, node: INode) {
        const typeParameters = node.getTypeParameters().map(typeParameterNode => new TypeParameterDefinition(mainFactory, typeParameterNode, this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }

    fillTypeParametersBySignature(mainFactory: MainFactory, signature: ISignature) {
        const typeParameters = signature.getTypeParameters().map(typeParameterSymbol => new TypeParameterDefinition(mainFactory, typeParameterSymbol.getOnlyNode(), this));
        this.typeParameters = new ArrayExt<TypeParameterDefinition<this>>(...typeParameters);
    }
}
