import {applyMixins} from "./../../utils";
import {TypeParameteredDefinitions} from "./../../definitions";
import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeExpressionDefinition} from "./../expressions";

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<TypeParameteredDefinitions> {
    constraintTypeExpression: TypeExpressionDefinition;

    constructor() {
        super(DefinitionType.TypeParameter);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: TypeParameteredDefinitions;
}

applyMixins(TypeParameterDefinition, BaseDefinition, [NamedDefinition]);
