import {applyMixins} from "./../../utils";
import {ExpressionDefinition} from "./../expression";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BasePropertyDefinition} from "./BasePropertyDefinition";

export abstract class BaseObjectPropertyDefinition extends BasePropertyDefinition implements DefaultExpressionedDefinition {
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
}

applyMixins(BaseObjectPropertyDefinition, BasePropertyDefinition, [DefaultExpressionedDefinition]);
