import {TypeExpression} from "./../../expressions";
import {applyMixins} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class TypeParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpression;

    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ParentType) {
        super(DefinitionType.TypeParameter);
        this.fillName(symbolNode);
        this.constraintTypeExpression = definitionFactory.getTypeExpression(symbolNode.getTypeParameterConstraintTypeExpression());
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
}

applyMixins(TypeParameterDefinition, [NamedDefinition]);
