import {applyMixins} from "./../../utils";
import {ISymbolNode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;

    constructor(symbolNode: ISymbolNode, parent: EnumDefinition) {
        super(DefinitionType.EnumMember);
        this.fillName(symbolNode);

        this.value = symbolNode.getConstantValue();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
