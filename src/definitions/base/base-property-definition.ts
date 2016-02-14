import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {DefinitionType} from "./definition-type";
import {BaseDefinition} from "./base-definition";

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;

    constructor(symbolNode: WrappedSymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillTypeExpression(symbolNode);
        this.isOptional = symbolNode.getPropertyIsOptional();
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
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
