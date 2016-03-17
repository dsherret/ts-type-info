import {applyMixins} from "./../../utils";
import {TypeExpression} from "./../expressions";
import {NamedDefinition} from "./NamedDefinition";
import {ParentedDefinition} from "./ParentedDefinition";
import {TypeExpressionedDefinition} from "./TypeExpressionedDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseDefinition} from "./BaseDefinition";

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType>, TypeExpressionedDefinition {
    isOptional: boolean;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, TypeExpressionedDefinition]);
