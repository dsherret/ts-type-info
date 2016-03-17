import {ArrayExt} from "./../../utils";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>();
}
