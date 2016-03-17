import {applyMixins} from "./../../utils";
import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeExpression} from "./../expressions";

export class TypeParameterDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpression;

    constructor() {
        super(DefinitionType.TypeParameter);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}

applyMixins(TypeParameterDefinition, BaseDefinition, [NamedDefinition]);
