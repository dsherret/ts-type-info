import {applyMixins} from "./../../utils";
import {INode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;

    constructor(node: INode, parent: EnumDefinition) {
        super(DefinitionType.EnumMember);
        this.fillName(node);

        this.value = node.getConstantValue();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
