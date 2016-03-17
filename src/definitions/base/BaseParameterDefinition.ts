import {applyMixins} from "./../../utils";
import {TypeExpressionDefinition, ExpressionDefinition} from "./../expressions";
import {NamedDefinition} from "./NamedDefinition";
import {ParentedDefinition} from "./ParentedDefinition";
import {TypeExpressionedDefinition} from "./TypeExpressionedDefinition";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition
                                                 implements NamedDefinition, ParentedDefinition<ParentType>, TypeExpressionedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
}

applyMixins(BaseParameterDefinition, BaseDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
