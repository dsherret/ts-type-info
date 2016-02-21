import {applyMixins} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {DefinitionType} from "./definition-type";
import {BaseDefinition} from "./base-definition";

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;

    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillTypeExpression(definitionFactory, symbolNode);

        this.isOptional = symbolNode.isPropertyOptional();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
