import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {Expression, TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {IDefaultExpressionedDefinition, DefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BaseDefinition} from "./base-definition";
import {DefinitionType} from "./definition-type";

export interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
    new(symbolNode: WrappedSymbolNode, parent: ParentType): ParameterType;
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition
                                                 implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(symbolNode: WrappedSymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillTypeExpression(symbolNode);
        this.fillDefaultExpression(symbolNode);
        this.isOptional = symbolNode.getParameterIsOptional();
        this.isRestParameter = symbolNode.getParameterIsRestParameter();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (symbolNode: WrappedSymbolNode) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
