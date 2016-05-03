import {applyMixins} from "./../../utils";
import {TypeExpressionDefinition, ExpressionDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";
import {TypeExpressionedDefinition} from "./TypeExpressionedDefinition";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => this;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
}

applyMixins(BaseParameterDefinition, BaseDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
