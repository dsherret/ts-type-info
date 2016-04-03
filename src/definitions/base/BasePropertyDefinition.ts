import {applyMixins} from "./../../utils";
import {TypeExpressionDefinition} from "./../expressions";
import {NamedDefinition} from "./NamedDefinition";
import {TypeExpressionedDefinition} from "./TypeExpressionedDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseDefinition} from "./BaseDefinition";

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition {
    isOptional: boolean;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, TypeExpressionedDefinition]);
