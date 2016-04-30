import {applyMixins} from "./../../utils";
import {NamedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeExpressionDefinition} from "./../expression";

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition {
    constraintTypeExpression: TypeExpressionDefinition;

    constructor() {
        super(DefinitionType.TypeParameter);
    }

    // NamedDefinition
    name: string;
}

applyMixins(TypeParameterDefinition, BaseDefinition, [NamedDefinition]);
