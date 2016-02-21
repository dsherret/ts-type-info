import {applyMixins, MainCache} from "./../../utils";
import {ISymbolNode} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {DefinitionType} from "./definition-type";
import {BaseDefinition} from "./base-definition";

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;

    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillTypeExpression(mainCache, symbolNode);

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
    fillTypeExpression: (mainCache: MainCache, symbolNode: ISymbolNode) => void;
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
