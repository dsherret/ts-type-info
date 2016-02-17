import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {BasePropertyStructure} from "./../../structures";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {DefinitionType} from "./definition-type";
import {BaseDefinition} from "./base-definition";

export class BasePropertyDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;

    constructor(symbolNodeOrStructure: WrappedSymbolNode | BasePropertyStructure, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(symbolNodeOrStructure);
        this.fillTypeExpression(symbolNodeOrStructure);

        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.isOptional = symbolNodeOrStructure.getPropertyIsOptional();
        }
        else {
            this.isOptional = symbolNodeOrStructure.isOptional;
        }

        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNodeOrStructure: WrappedSymbolNode | BasePropertyStructure) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (symbolNodeOrStructure: WrappedSymbolNode | BasePropertyStructure) => void;
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
