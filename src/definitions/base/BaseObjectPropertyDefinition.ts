import {applyMixins} from "./../../utils";
import {ExpressionDefinition} from "./../expression";
import {DefinitionType} from "./DefinitionType";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BasePropertyDefinition} from "./BasePropertyDefinition";

export abstract class BaseObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
}

applyMixins(BaseObjectPropertyDefinition, BasePropertyDefinition, [DefaultExpressionedDefinition]);
