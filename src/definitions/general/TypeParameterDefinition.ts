import {applyMixins} from "./../../utils";
import {NamedDefinition, BaseDefinition} from "./../base";
import {TypeDefinition} from "./../expression";

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintType: TypeDefinition | null;

    // NamedDefinition
    name: string;
}

applyMixins(TypeParameterDefinition, BaseDefinition, [NamedDefinition]);
