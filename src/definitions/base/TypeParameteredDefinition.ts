import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[] = [];
}
