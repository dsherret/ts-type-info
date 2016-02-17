import {TypeExpression} from "./../../expressions";
import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {NamedStructure} from "./../../structures";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class TypeParameterDefinition<ParentType> extends BaseDefinition implements INamedDefinition, IParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpression;

    constructor(symbolNode: WrappedSymbolNode, parent: ParentType) {
        super(DefinitionType.TypeParameter);
        this.fillName(symbolNode);
        this.constraintTypeExpression = symbolNode.getTypeParameterConstraintTypeExpression();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode | NamedStructure) => void;
    // IParentedDefinition
    parent: ParentType;
}

applyMixins(TypeParameterDefinition, [NamedDefinition]);
