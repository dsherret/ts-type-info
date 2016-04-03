import {applyMixins} from "./../../utils";
import {ExpressionDefinition} from "./../expressions";
import {DefinitionType} from "./DefinitionType";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BasePropertyDefinition} from "./BasePropertyDefinition";

export abstract class ObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
}

applyMixins(ObjectPropertyDefinition, BasePropertyDefinition, [DefaultExpressionedDefinition]);
