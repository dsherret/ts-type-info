import {applyMixins} from "./../../utils";
import {NamedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeDefinition} from "./../expression";

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintType: TypeDefinition | null;

    constructor() {
        super(DefinitionType.TypeParameter);
    }

    // NamedDefinition
    name: string;
}

applyMixins(TypeParameterDefinition, BaseDefinition, [NamedDefinition]);
