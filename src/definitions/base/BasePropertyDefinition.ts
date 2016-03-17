import {applyMixins} from "./../../utils";
import {TypeExpressionDefinition} from "./../expressions";
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
    typeExpression: TypeExpressionDefinition;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, TypeExpressionedDefinition]);
