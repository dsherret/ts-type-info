import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {NamedStructure, EnumMemberStructure} from "./../../structures";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;

    constructor(symbolNodeOrStructure: WrappedSymbolNode | EnumMemberStructure, parent: EnumDefinition) {
        super(DefinitionType.EnumMember);
        this.fillName(symbolNodeOrStructure);

        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.value = symbolNodeOrStructure.getConstantValue();
        }
        else {
            this.value = symbolNodeOrStructure.value;
        }

        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode | NamedStructure) => void;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
