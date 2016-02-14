import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;

    constructor(symbolNode: WrappedSymbolNode, parent: EnumDefinition) {
        super(DefinitionType.EnumMember);
        this.fillName(symbolNode);
        this.value = symbolNode.getConstantValue();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
