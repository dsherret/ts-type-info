import {ArrayExt} from "./../../utils";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>(); // todo: need to change applyMixins to call this, then remove everywhere that auto assigns it
}
